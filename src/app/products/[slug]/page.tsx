"use client"

import SidebarWrapper from '@/app/components/sidebar/SidebarWrapper'
import NotiIcon from '@/app/components/svgs/NotiIcon'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Form from '../add-product/Form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/components/redux/store'
import { setProductName, setDescription, setCategory, setSize, setColor, setPriceNGN, setPriceUSD, setPriceGBP, setDiscount, setDeliveryNGN, setQuantity, setDeliveryUSD, setDeliveryGBP } from '@/app/components/redux/productSlice'
import axios from 'axios'
import EditProductForm  from './EditProductForm';
import { setProductDetails } from '../../components/redux/productSlice';
import { ProductDetail } from '@/types'

interface Params {
  params: {
    slug?: string
  }
}

const SingleProduct = ({ params }: Params) => {
  const product = useSelector((state: RootState) => state.product);
  const user = useSelector((state: RootState) => state.user.email)

  const { slug } = params;

  const dispatch = useDispatch();

  useEffect(() => {

    const config = {
      headers: { Authorization: `Bearer ${user?.access_token}` }
    };

    const getSingleProduct = async() => {
      try{
        const response = await axios.get(`https://love.thegoldscarf.com/api/brand/product/${slug}`, config);
        

        dispatch(setProductDetails(response.data));
        dispatch(setProductName(response.data.data[0].name));
        dispatch(setCategory(response.data.data[0].category));
        dispatch(setDescription(response.data.data[0].description));

        console.log(product.productDetails)

        const sizeres = response.data.data[0].details.map((item: { size: string }, index: number) => {
          console.log(item.size);
          dispatch(setSize({value: item.size, index}));
          return item.size
        });
        
        const colorres = response.data.data[0].details.map((item: { color: string }, index: number) => {   
          dispatch(setColor({value: item.color, index}));
          return item.color
        });

        const priceNgnres = response.data.data[0].details.map((item: { price_ngn: string }, index: number) => {   
          dispatch(setPriceNGN({value: item.price_ngn, index}));
          return item.price_ngn
        });

        const priceUSDres = response.data.data[0].details.map((item: { price_usd: string }, index: number) => {   
          dispatch(setPriceUSD({value: item.price_usd, index}));
          return item.price_usd
        });

        const priceGbPpres = response.data.data[0].details.map((item: { price_gbp: string }, index: number) => {   
          dispatch(setPriceGBP({value: item.price_gbp, index}));
          return item.price_gbp
        });

        const discountres = response.data.data[0].details.map((item: { discount: string }, index: number) => {   
          dispatch(setDiscount({value: item.discount, index}));
          return item.discount
        });
        console.log(product.discount)

        const quantityres = response.data.data[0].details.map((item: { quantity: string }, index: number) => {   
          dispatch(setQuantity({value: item.quantity, index}));
          return item.quantity
        });

        const deliveryNgnres = response.data.data[0].details.map((item: { delivery_ngn: string }, index: number) => {   
          dispatch(setDeliveryNGN({value: item.delivery_ngn, index}));
          return item.delivery_ngn
        });

        const deliveryUsdres = response.data.data[0].details.map((item: { delivery_usd: string }, index: number) => {   
          dispatch(setDeliveryUSD({value: item.delivery_usd, index}));
          return item.delivery_usd
        });

        const deliveryGBPres = response.data.data[0].details.map((item: { delivery_gbp: string }, index: number) => {   
          dispatch(setDeliveryGBP({value: item.delivery_gbp, index}));
          return item.delivery_gbp
        });

        
        
        console.log(response.data.data[0].details);
      }catch(error){
        console.log(error)
      }
    }

    getSingleProduct()
  }, []);


  return (
    <div className='bg-[#fafafa] w-[100%] h-full'>
    <SidebarWrapper />
    
    <div className='py-6 pr-[20px] pl-8 md:pl-[260px] min-h-[100vh]'>
        <EditProductForm 
          slug={slug}
        />
    </div>


    </div>
  )
}

export default SingleProduct