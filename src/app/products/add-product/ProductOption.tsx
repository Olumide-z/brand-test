import React, { useState } from 'react'
import Option from '../Option'
import { productOptions } from '@/constants/data'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '@/app/components/redux/store';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UploadedImage {
    id: number; 
    url?: string;
    
}[]

interface SelectedImage {
    id: number;
    url?: string; 
    productOptionId?: number
}

interface SlugProps{
    slug: string | undefined
}

interface ProductOptionProps {
    prevStep: () => void;
    uploadedImages: UploadedImage[];
    setUploadedImages: React.Dispatch<any>;
    imagePreviews: string[];
    setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
    edit?: boolean;
    slug?: SlugProps
}

const ProductOption = ({ slug, edit, prevStep, uploadedImages, setUploadedImages, imagePreviews, setImagePreviews} : ProductOptionProps) => {
    const [visible, setVisible] = useState(1);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false);
    const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
    

    const showMoreOptions = () => {
        setVisible((prevValue) => prevValue + 1)
    };

    const [switchStates, setSwitchStates] = useState([ 
        false, false, false, false, false, false, false, false, false, false
    ]);
    
    const handleSwitchToggle = (index: number) => {
        const value = !switchStates[index]
        console.log(value)
        setSwitchStates((prev) => {
            const newStates = [...prev]
            newStates.splice(index, 1, value);
            return newStates
        })
        
    };
    // console.log(selectedImages?.id)
    
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => state.product);
    const user = useSelector((state: RootState) => state.user.email);
    console.log(product.size)
    // create a product
    const createProduct = async() => {

        try{
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${user?.access_token}` }
            };
            
            const imageId = uploadedImages.map(image => image.id);
            const image = selectedImages?.map((item) => item?.id);
            
            const productOptionsData = productOptions
            .map((option, index) => {
                return {
                    image_id: image[index],
                    size: product.size[index] || '',
                    discount: parseInt(product.discount[index]) || 0,
                    quantity: parseInt(product.quantity[index]) || 0,
                    color: product.color[index] || '',
                    price_ngn: parseInt(product.priceNGN[index]) || 0,
                    price_usd: parseInt(product.priceUSD[index]) || 0,
                    price_gbp: parseInt(product.priceGBP[index]) || 0,
                    delivery_ngn: parseInt(product.deliveryNGN[index]) || 0,
                    delivery_usd: parseInt(product.deliveryUSD[index]) || 0,
                    delivery_gbp: parseInt(product.deliveryGBP[index]) || 0,
                };
            })
            .filter(option => option.size !== '');
            
        const requestData = {
            image_ids: imageId,
            name: product.productName,
            description: product.description,
            category: product.category,
            details: productOptionsData,
        };

        console.log('Request Data:', requestData); // Check the request data in the console

        const response = await axios.post(
            'https://love.thegoldscarf.com/api/brand/product/create',
            requestData,
            config
        );

        console.log('Response:', response.data)
        
        setSuccess(true)
        // setErrorMessage(false)
        }catch(error){
            console.log(error)
            setErrorMessage(true);
           
        }finally{
            setIsLoading(false)
        }
    }

    // update product
    const updateProduct = async ({ slug }: any) => {
        try{
            setIsLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${user?.access_token}` }
            };

            const imageId = uploadedImages.map(image => image.id);
            const image = selectedImages?.map((item) => item?.id);
            
            const productOptionsData = productOptions
            .map((option, index) => {
                return {
                    image_id: image[index],
                    size: product.size[index] || '',
                    discount: parseInt(product.discount[index]) || 0,
                    quantity: parseInt(product.quantity[index]) || 0,
                    color: product.color[index] || '',
                    price_ngn: parseInt(product.priceNGN[index]) || 0,
                    price_usd: parseInt(product.priceUSD[index]) || 0,
                    price_gbp: parseInt(product.priceGBP[index]) || 0,
                    delivery_ngn: parseInt(product.deliveryNGN[index]) || 0,
                    delivery_usd: parseInt(product.deliveryUSD[index]) || 0,
                    delivery_gbp: parseInt(product.deliveryGBP[index]) || 0,
                };
            })
            .filter(option => option.size !== '');
            
        const requestData = {
            image_ids: imageId,
            name: product.productName,
            description: product.description,
            category: product.category,
            details: productOptionsData,
        };

        const response = await axios.put(
            `https://love.thegoldscarf.com/api/brand/product/edit/${slug}`,
            requestData,
            config
        );

        console.log('Response:', response.data)
        
        setSuccess(true)

        }catch(error){
            console.log(error)
            setErrorMessage(true);
           
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div>
         <div className='justify-center items-center min-[500px]:flex hidden md:pt-0 pt-5'>
            <div className='flex gap-4 items-center'>
                <button className='active-indicator' onClick={prevStep}>1</button>
                <div className="indicator-lineFull"/>
                <button className='active-indicator'>2</button>
            </div>
        </div>
        
        {/*  */}
        {/* form inputs */}
        <div className='text-left m-3'>
            {productOptions.slice(0, visible).map((option, index) => (
                <Option 
                    displayedImage={selectedImages?.find((item) => item?.productOptionId === option.id)}
                    option={option}
                    id={option.id}
                    key={index}
                    index={index}
                    switchState={switchStates[index]}
                    handleSwitch={()=>{handleSwitchToggle(index)}}
                    uploadedImages={uploadedImages}
                    setUploadedImages={setUploadedImages}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                />
            ))}
            {/* show more options */}
            {visible < 10 && <button onClick={showMoreOptions} className='h-[40px] w-full min-[400px]:w-[285px] min-[400px]:px-[20px] px-[10px] py-[10px]  rounded-lg bg-[#fff6e0] text-[#DB9E04] font-open font-[700] min-[500px]:text-[14.41px] text-[12px] mt-9'>
                Click to add more product options
            </button>}
            {/* SUccess Modal */}
           {success && 
                <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                 <div className="flex items-center justify-center min-h-screen">
                   {/* Modal content */}
                   <div className=" font-open h-[400px] pb-[3rem] flex flex-col justify-end relative overflow-auto bg-white min-[550px]:w-[500px] min-[400px]:w-[380px] w-[320px] rounded-lg p-4">
                        <h1 className='font-[700] text-center leading-[48px] text-[30px] text-[#DB9E04]'>Success !!!</h1>  
                        <p className='font-[400] text-center text-[16px] text-[#202020]'>Your product has been uploaded successfully</p>
                        <Link href='/products'>
                        <button className='w-full h-[45px] rounded-sm bg-[#DB9E04] text-[#fff]' onClick={() => setSuccess(false)}>
                            Continue
                        </button>
                        </Link>
                    </div>
                </div>
                </div>
           }
           {errorMessage && <p className='text-red-500 font-inter flex justify-end mt-24 text-[0.9rem] mb-2'>Please input all required products value.</p>}
            <div className='flex justify-end'>
                <div className='flex gap-4 mt-6 mb-6 flex-wrap'>
                    <button className='w-[95.49px] h-[47px] bg-[#DFDFDF] rounded-lg font-open text-[14.41px] font-[500] text-[#9C9C9C]'>
                        Cancel
                    </button>
                    
                    {!edit && 
                        <button 
                        onClick={() => createProduct()} 
                        className='w-[150px] h-[47px] bg-[#DB9E04] rounded-lg font-open text-[14.41px] font-[600] text-[#ffff]'>
                            {isLoading ? 'Uploading...' : 'Upload Product'}
                        </button>
                    }

                    {edit && 
                        <button 
                        onClick={() => updateProduct(slug)} 
                        className='w-[150px] h-[47px] bg-[#DB9E04] rounded-lg font-open text-[14.41px] font-[600] text-[#ffff]'>
                            {isLoading ? 'Uploading...' : 'Upload Product'}
                        </button>
                    }

                </div>
            </div>
        </div>
    </div>
    
  )
}

export default ProductOption
