"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import OptionsInput from '../OptionsInput'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/components/redux/store'
import Modal from '@/app/components/modal/Modal'
import { setCategory, setDescription, setProductDetails, setProductName } from '@/app/components/redux/productSlice'

interface AddProductProps {
    imageUpload: () => Promise<void>;
    imageError: boolean;
    isLoading: boolean;
    setImage: React.Dispatch<React.SetStateAction<never[]>>;
    modalMessage: string;
    setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isErrorModalOpen: boolean;
    imagePreviews: string[];
    setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
    setProductsInputError: React.Dispatch<React.SetStateAction<boolean>>;
    productsInputError: boolean;
    edit?: boolean;
}

const AddProduct = ({ 
    imageUpload, imageError, 
    isLoading, setImage, modalMessage, productsInputError, setProductsInputError,
    setIsErrorModalOpen, isErrorModalOpen, imagePreviews, setImagePreviews, edit
}: AddProductProps) => {
    
    const productDetails = useSelector((state: RootState) => state.product.productDetails);

    console.log({productDetails})
    const dispatch = useDispatch();
    const product: any = useSelector((state: RootState) => state.product);

    const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setProductName(e.target.value));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCategory(e.target.value));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setDescription(e.target.value));
    };
    

    useEffect(() => {
           // Load data from localStorage when component mounts
        const storedProductsString = localStorage.getItem('productData');

        if (storedProductsString !== null) {
            const storedProducts = JSON.parse(storedProductsString);
            dispatch(setProductName(storedProducts.productName));
            dispatch(setCategory(storedProducts.category));
            dispatch(setDescription(storedProducts.description));
        }
      }, []);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e?.target?.files;
        
        

        if (fileList) {
            const newPreviews: string[] = [];

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const previewUrl = URL.createObjectURL(file);
                newPreviews.push(previewUrl);
                
            }
           
            setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }      
    };

    // remove Image
    const removeImage = (index: number) => {
        setImagePreviews(images => images.filter((_, imgIndex) => index !== imgIndex))
    }

    const [images, setImages] = useState(product?.productDetails?.data[0]?.images || []);

    const removeEditImage = (index: number) => {
        setImages(images.filter((_:any, idx: number) => idx !== index));
    };

  return (
    <>
    <div className='mt-3'>
        
        <h3 className='font-open font-[700] mb-3 text-[15.41px] leading-[20px]'>Product Image(s)</h3>
        <div className='flex items-start gap-8 flex-wrap'>
            <div className='product-image text-center flex items-center justify-center flex-col'>
                <input 
                    type='file' id='file' multiple
                    onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => {
                        handleChange(e);
                        setImage(e?.target?.files)
                    }} 
                    className='hidden'
                />
                <div className='flex items-center justify-center flex-col'>
                    <label htmlFor='file'>
                        <Image 
                            src='/images/gallery.png' 
                            width={22} height={22} alt='gallery'
                            className='cursor-pointer'
                        />
                    </label>
                    <p className='font-poppins text-[9.5px] leading-4 text-center mt-2'>
                        Drop your image here or <label htmlFor='file' className='text-[#DB9E04] cursor-pointer'>browse</label> JPG, PNG and GIF are allowed
                    </p>
                </div>
            </div>
            {/* display images */}
            <div className='flex items-center gap-3 flex-wrap'>
                {imagePreviews?.map((previewUrl, index) => (
                    <div key={index} className='relative md:w-[160px] md:h-[168px] w-[130px] h-[147px]'>
                        <Image 
                            src={previewUrl} alt={`Image ${index}`}
                            fill
                            className='absolute object-cover rounded-lg'
                        />
                        <p 
                            className='absolute flex justify-center items-center top-0 right-0 m-2 z-10 cursor-pointer bg-[#fff] h-5 w-5 text-[0.9rem] rounded-[50%] text-[#DB9E04]'
                            onClick={() => removeImage(index)}
                        >x</p>
                    </div>
                ))}
                 {/*edit  */}
                 {edit && images?.map((item: {url: string}, index: number) => (
                    <div key={index} className='relative md:w-[160px] md:h-[168px] w-[130px] h-[147px]'>
                        <Image 
                            src={item.url} alt={`Image ${index}`}
                            fill
                            className='absolute object-cover rounded-lg'
                        />
                    <p 
                        className='absolute flex justify-center items-center top-0 right-0 m-2 z-10 cursor-pointer bg-[#fff] h-5 w-5 text-[0.9rem] rounded-[50%] text-[#DB9E04]'
                        onClick={() => removeEditImage(index)}
                    >x</p>
                </div>
                 ))}
            </div>
        </div>
    </div>
    {/* Input fields */}
    <div>
        <div className='flex justify-between gap-2 items-center flex-wrap'>
            <Input 
                placeholder='Input your product name'
                label='Product Name'
                value={product.productName} 
                onInputChange={handleProductNameChange}
            />
            <Input 
                label='Category'
                placeholder='Select a product category'
                onInputChange={handleCategoryChange}
                value={product.category}
            />
        </div>
        <div className='flex justify-between gap-2 items-start flex-wrap'>
            <Input 
                placeholder='Input a product description'
                label='Product Description' 
                textarea
                textareaChange={handleDescriptionChange}
                value={product.description}
            />
            
        </div>
    </div>
    
    {/* Buttons */}
    <div className='flex justify-end'>
    {imageError && isErrorModalOpen &&
        <Modal
            message={modalMessage}
            onClose={() => setIsErrorModalOpen(false)}
            isSuccess={false}
        />
    }
    {productsInputError && isErrorModalOpen &&
        <Modal
            message={modalMessage}
            onClose={() => setIsErrorModalOpen(false)}
            isSuccess={false}
        />
    }
    <div className='flex gap-4 mt-24 mb-6 flex-wrap'>
        <button className='min-[400px]:w-[95.49px] w-[100%] h-[47px] bg-[#DFDFDF] rounded-lg font-open text-[14.41px] font-[500] text-[#9C9C9C]'>
            Cancel
        </button>
        
        <button 
            onClick={() => imageUpload()} 
            className='min-[400px]:w-[150px] w-[100%] h-[47px] bg-[#DB9E04] rounded-lg font-open text-[14.41px] font-[600] text-[#ffff]'
        >
            {isLoading ? 'Uploading...' : 'Next Step'}
        </button>
    </div>
    </div>
    </>
  )
}

export default AddProduct