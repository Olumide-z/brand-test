"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AddProduct from './AddProduct'
import NotiIcon from '@/app/components/svgs/NotiIcon';
import Avatar from '../../../../public/images/userAvatar.png'
import { FaArrowLeft } from "react-icons/fa6";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductOption from './ProductOption';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/components/redux/store';
import axios, { AxiosResponse } from 'axios';
import { setProductDetails } from '@/app/components/redux/productSlice';
import { SingleProduct } from '@/types';


 const AddProductForm = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [image, setImage] = useState([])
    const [uploadedImages, setUploadedImages] = useState<any>()
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [productsInputError, setProductsInputError] = useState(false)

    const product = useSelector((state: RootState) => state.product);

    // State to keep track of current step
  const [currentStep, setCurrentStep] = useState(1);

   // Function to handle next step
   const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to handle previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };



  const router = useRouter();
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.user.email);

    // IMAGES UPLOAD  HANDLER
    const imageUpload = async() => {
        const formData = new FormData();

        for(let i=0; i < image.length; i++){
            formData.append('images[]', image[i]);
        }

        if(image.length < 1){
            setImageError(true)
            setModalMessage('Please provide all informations')
            setIsErrorModalOpen(true)
        }

        try{
            setIsLoading(true)
            const config = {
                headers: { 
                    Authorization: `Bearer ${user?.access_token}`, 
                    "Content-Type": "multipart/form-data"
                }
            };

            const response = await axios.post(
                'https://love.thegoldscarf.com/api/brand/product/images', 
                formData,
                config
            );

            // Store the response data in local storage
            localStorage.setItem('uploadedImages', JSON.stringify(response.data.data));

            setUploadedImages(response.data.data.data);
            
            nextStep()
        }catch(error){
            console.log({error})
        }finally{
            setIsLoading(false)
        }
    }
    
    const defaultProductState: SingleProduct = { data: [] };

    useEffect(() => {
        return () => {
            localStorage.removeItem('productData');
            localStorage.removeItem('uploadedImages');
            dispatch(setProductDetails(defaultProductState));
        }
    }, [])

  const renderStep = () => {
    switch (currentStep) {
        case 1: 
        return (
            <>
                <div className='flex justify-between items-center mb-4'>
                <div onClick={() => router.back()} className='flex gap-3 items-center cursor-pointer'>
                    <FaArrowLeft />
                    <h1 className='font-open font-[400] text-[1rem] text-[#333333] leading-[22px]'>Add Product</h1>
                </div>
                {/* profile iamge & notification */}
                <div className='flex gap-3'>
                    <NotiIcon />
                    <Image
                        src={Avatar}
                        alt='avatar'
                        className='rounded-[50%] object-cover'
                        width={40}
                        height={40}
                    />  
                </div>  
                </div>
                <div className='bg-[#ffff] rounded-lg w-full md:p-8 p-4'>
                    <div className='justify-center items-center min-[500px]:flex hidden md:pt-0 pt-5'>
                        <div className='flex gap-4 items-center'>
                            <button className='active-indicator'>1</button>
                            <div className="indicator-line"/>
                            <button onClick={nextStep} className='indicator'>2</button>
                        </div>  
                    </div>
                    {/* form */}
                    <div className='text-left mr-3'>
                    <AddProduct 
                        imageUpload={imageUpload}
                        imageError={imageError}
                        isLoading={isLoading}
                        setImage={setImage}
                        modalMessage={modalMessage}
                        setIsErrorModalOpen={setIsErrorModalOpen}
                        isErrorModalOpen={isErrorModalOpen}
                        imagePreviews={imagePreviews}
                        setImagePreviews={setImagePreviews}
                        setProductsInputError={setProductsInputError}
                        productsInputError={productsInputError}
                    />
                    </div>
                </div>
            </>
        );
        case 2: 
        return (
            <>
                <div className='flex justify-between items-center mb-4'>
                    <div onClick={prevStep} className='flex gap-3 items-center cursor-pointer'>
                        <FaArrowLeft />
                        <h1 className='font-open font-[400] text-[1rem] text-[#333333] leading-[22px]'>Product Details</h1>
                    </div>
                    {/* profile iamge & notification */}
                    <div className='flex gap-3'>
                        <NotiIcon />
                        <Image
                            src={Avatar}
                            alt='avatar'
                            className='rounded-[50%] object-cover'
                            width={40}
                            height={40}
                        />  
                    </div>  
                </div>
                <div className='bg-[#ffff] rounded-lg w-full md:p-8 p-4'>
                    <ProductOption 
                        prevStep={prevStep}
                        uploadedImages={uploadedImages}
                        setUploadedImages={setUploadedImages}
                        imagePreviews={imagePreviews}
                        setImagePreviews={setImagePreviews}
                    />
                </div>
            </>
        );
        default : 
        return null
    }
  }

  return (
    <div>
        {renderStep()}
    </div>
  )
}




export default AddProductForm;