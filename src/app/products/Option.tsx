"use client"

import React, { useEffect, useState } from 'react'
import OptionsInput from './OptionsInput';
import Input from './Input';
import ToggleSwitch from './ToggleSwitch';
import Image from 'next/image';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../components/redux/store';
import { setColor, setDeliveryGBP, setDeliveryNGN, setDeliveryUSD, setDiscount, setPriceGBP, setPriceNGN, setPriceUSD, setQuantity, setSize } from '../components/redux/productSlice';
import axios from 'axios';
import SelectedImage from './SelectedImage';

interface OptionProps {
    option: {
        id: number;
        name: string;
    };   
    index: number;
    switchState: any;
    handleSwitch: () => void;
    uploadedImages: any;
    setUploadedImages: React.Dispatch<any>;
    selectedImages: any;
    setSelectedImages: React.Dispatch<any>;
    id: number;
    displayedImage: any;
}

const Option = ({ 
    option, index, selectedImages, setSelectedImages, 
    uploadedImages, setUploadedImages, id, displayedImage
}: OptionProps) => {
    const [isDiscount, setIsDiscount] = useState(false);
    const [isSizes, setIsSizes] = useState(false);

    const [isCurrency, setIsCurrency] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imagesData, setImagesData] = useState(uploadedImages?.length > 0 ? uploadedImages[0] : null);
   

    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => state.product);

    const handlePriceNGNChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(setPriceNGN({ value: e.target.value, index }));
    };

    const handlePriceUSDChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(setPriceUSD({ value: e.target.value, index }));
    };

    const handlePriceGBPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(setPriceGBP({ value: e.target.value, index }));
    };

    const handleDeliveryNGNChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(setDeliveryNGN({ value: e.target.value, index }));
    };

    const handleDeliveryUSDChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(setDeliveryUSD({ value: e.target.value, index }));
    };

    const handleDeliveryGBPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(setDeliveryGBP({ value: e.target.value, index }));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(setColor({ value: e.target.value, index }));
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(setQuantity({ value: e.target.value, index }));
    };
    
    const handleDiscountChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        dispatch(setDiscount({ value: e.target.value, index }));
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        dispatch(setSize({ value: e.target.value, index }));
    };
    
    
    useEffect(() => {
        // Retrieve the uploaded images from local storage
        const storedImages = localStorage.getItem('uploadedImages');

        if (storedImages) {
            setUploadedImages(JSON.parse(storedImages));
        }
    }, []);

    
    useEffect(() => {
        // Update imagesData when uploadedImages changes
        if (uploadedImages?.length > 0) {
            setImagesData(uploadedImages[0]);
        }
    }, [uploadedImages]);
    

    const handleImageChange = (index: number, id: number) => {
        const slider = uploadedImages[index];
        setImagesData(slider);
        slider.productOptionId = id;

        setSelectedImages([...selectedImages, slider]);
    }

    console.log({imagesData})
    const handleConfirm = (index: number) => {
        setIsModalOpen(false);
        // Remove the selected image from the uploaded images
        const updatedImages = uploadedImages.filter((image: any) => image.id !== selectedImages.id);
        setUploadedImages(updatedImages);
    }

    console.log({uploadedImages})

    const removeSelectedImage = () => {
        setSelectedImages(null)
    }

    // DISCOUNT
    const [ discounts ] = useState(['5%', '10%', '15%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%' ]);
    const [ allSizes ] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']);

    const currencySwitch = () => {
        setIsCurrency((prevCurrency) => !prevCurrency);
    };

    const discountSwitch = () => {
        setIsDiscount((prevDiscount) => !prevDiscount);
    };

     const openIsModal = () => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
        setIsModalOpen(true);
    };
   

    
  return (
    <div className='mt-6'>
        <h1 className='font-open font-[700] text-[16px] leading-[22px] mb-4'>{option.name}</h1>
        <div className='flex gap-4 flex-wrap items-center'>
        {/* Select image */}
        <div className='image-select flex items-center justify-center'>
            <div className='flex items-center justify-center flex-col'>
                <Image 
                    src='/images/gallery.png' 
                    width={22} height={22} alt='gallery'
                    className='cursor-pointer'
                    onClick={openIsModal}
                />
                <p className='font-poppins text-[11px] leading-4 text-center mt-2 text-[#999999]'>
                    <span className='text-[#DB9E04] cursor-pointer' onClick={() => setIsModalOpen(true)}>Select</span> Product image
                </p>
            </div>
        </div>
         {/* Selected image */}
         {displayedImage &&  
            <SelectedImage selectedImage={displayedImage} removeSelectedImage={removeSelectedImage} />
         }
        </div>
        {/* IMAGE MODAL */}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex items-center justify-center min-h-screen">
              {/* Modal content */}
              <div className="relative overflow-auto bg-white min-[550px]:w-[500px] min-[400px]:w-[380px] w-[320px] rounded-lg p-4">
                <div className='flex items-center justify-between'>
                    <h1  className='font-inter font-[600] text-[18px]'>Select Product Image</h1>
                    {/* Close button */}
                    <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    >X</button>
                </div>
                <p className='font-inter font-[400] text-[14px] leading-5'>This is the specific image for the product option. 
                    Eg if the product option is red, the image selected should be the red version of the product
                </p>
                {/* IMAGES SELECTION */}
                <div className='mt-4'>
                    <div className='w-[100%] h-[312px] relative bg-no-repeat bg-cover rounded-lg' style={{backgroundImage: `url(${imagesData?.url})`}}> 
                    </div>
                    <div className='flex gap-3 flex-wrap'>
                        {uploadedImages?.map((image: any, index: number) => (
                            <div key={image.id} 
                            className='w-[28px] h-[28px] relative mt-4 cursor-pointer'
                            onClick={() => handleImageChange(index, id)}
                            >
                                <Image 
                                    src={image.url}
                                    fill
                                    objectFit='cover'
                                    alt='product image'
                                    className={`absolute rounded-[50%] ${imagesData.id === index ? 'border-6 border-[#000]' : ""}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex gap-4 my-4 justify-end'>
                    <button 
                    onClick={() => setIsModalOpen(false)}
                    className='w-[99px] h-[44px] bg-transparent border-[1px] border-[#D0D5DD] rounded-lg font-open text-[14.41px] font-[500] text-[#9C9C9C]'>
                        Cancel
                    </button>
                    <button onClick={() => handleConfirm(index)} className='w-[99px] h-[44px] bg-[#DB9E04] rounded-lg font-open text-[14.41px] font-[600] text-[#ffff]'>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='flex justify-between gap-2 items-start flex-wrap'>
            
            <OptionsInput 
                label='Product Size'
                optionValue='Select product sizes'
                state={isSizes}
                selectedValue={product.size[index] || ''}
                options={allSizes}
                handleSelectChange={(e) => handleSizeChange(e, index)}
            />
            
            <Input 
                label='Colour Available'
                placeholder='Select product colours'
                value={product.color[index] || ''}
                onInputChange={(e) => handleColorChange(e, index)}
            />
        </div>
        <div className='flex justify-between gap-2 items-start flex-wrap'>
            <Input 
                placeholder='Input a product price'
                icon
                value={product.priceNGN[index] || ''}
                onInputChange={(e) => handlePriceNGNChange(e, index)}
                label='Product Price'
                image='naira.png'
            />
             <Input 
                placeholder='Input stock quantity'
                label= 'Avaliable Stock'
                value={product.quantity[index] || ''}
                onInputChange={(e) => handleQuantityChange(e, index)}
            />
        </div>
        {/* Multi currency input */}
        <div className='mt-6'>
            <div>
            <div className='flex gap-3 items-center'>
                <label className='font-[700] text-[14.41px]'>Multi-Currency</label>
                {/* toggle switch */}
                <ToggleSwitch 
                    state={isCurrency}
                    handleSwitch={currencySwitch}
                />
                <Image 
                    src="/images/info.png"
                    width={15}
                    height={15}
                    alt='info'
                />
            </div>
            </div>
            {isCurrency && 
            <>
                <Input 
                    placeholder='Input a product price'
                    icon
                    value={product.priceUSD[index] || ''}
                    onInputChange={(e) => handlePriceUSDChange(e, index)}
                    image='dollar.png'
                />
                <Input 
                    placeholder='Input a product price'
                    icon
                    value={product.priceGBP[index] || ''}
                    onInputChange={(e) => handlePriceGBPChange(e, index)}
                    image='pounds.png'
                />
            </>
            }
        </div>
        {/* DELIVERY FEE */}
        <div className='flex justify-between gap-2 items-start flex-wrap'>
            <div className='mt-6'>
            <Input 
                placeholder='Input a delivery fee'
                icon
                value={product.deliveryNGN[index] || ''}
                onInputChange={(e) => handleDeliveryNGNChange(e, index)}
                label='Delivery Fee'
                image='naira.png'
            />
            {isCurrency && <>
                 <Input 
                    placeholder='Input a delivery fee'
                    icon
                    value={product.deliveryUSD[index] || ''}
                    onInputChange={(e) => handleDeliveryUSDChange(e, index)}
                    image='dollar.png'
                />
                <Input 
                    placeholder='Input a delivery fee'
                    icon
                    value={product.deliveryGBP[index] || ''}
                    onInputChange={(e) => handleDeliveryGBPChange(e, index)}
                    image='pounds.png'
                />
            </>}
            </div>
            {/* discount */}
            <div className='mt-6'>
                <OptionsInput 
                    label='Discount'
                    optionValue='Select applicable discount'
                    state={isDiscount}
                    handleSwitch={discountSwitch}
                    selectedValue={product.discount[index] || ''}
                    options={discounts}
                    handleSelectChange={(e) => handleDiscountChange(e, index)}
                />
            </div>
        </div>
         {/* Button */}
        
    </div>
  )
  
}

export default Option