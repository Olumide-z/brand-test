import React, { useEffect, useRef, useState } from 'react'
import { tableHeadData } from './data'
import { BrandProductsType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { HiOutlineDotsVertical } from "react-icons/hi";

interface BrandProducts{
    brandProducts: BrandProductsType;
    setBrandProducts: React.Dispatch<any>;
    onUpdateProducts: () => void; 
    filteredProducts: BrandProductsType | null;
}

const Table = ({ brandProducts, onUpdateProducts, setBrandProducts, filteredProducts }: BrandProducts) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropdown, setDropdown] = useState<number | null>(null)

  

  const user = useSelector((state: RootState) => state.user.email)

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleIsDropdown = (index: number) => {
    setDropdown(dropdown === index ? null : index);
  };
    //DROPDOWN LEAVES WHEN USER CLICK ON THE PAGE   
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setDropdown(null)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    //   DELETE PRODUCT
  const handleDelete = async (slug: string) => {
    
    const config = {
        headers: { Authorization: `Bearer ${user?.access_token}` }
    };

    try{
        await axios.delete(`https://love.thegoldscarf.com/api/brand/product/delete/${slug}`, config);
        console.log('deleted successfully')
        onUpdateProducts();
        
    }catch(error){
        console.log(error);
    }
  }

    //   HANDLE DEACTIVATION OF 
    const handleDeactivation = async (slug: string) =>{

        const config = {
            headers: { Authorization: `Bearer ${user?.access_token}` }
        };

        try{
            const response = await axios.put(
                `https://love.thegoldscarf.com/api/brand/product/edit/${slug}`,
                {status: false},
                config
            )
            onUpdateProducts();
            console.log(response)
            console.log('deactivated')

        }catch(error){
            console.log({error})
        }
    }
 

  return (
    <div className="overflow-x-auto">
       
        <>
        <div className='md:block hidden'>
        <table className='w-full mt-8'>
            <thead>
            <tr className='tableHead w-full'>
                <th className='font-poppins mt-8 py-2 px-8 center'>
                    <div className='flex gap-3 items-center'>
                        <input type='checkbox' />
                        <p className='font-semibold text-xs leading-4'>Product Name</p>
                    </div>
                </th>
                {tableHeadData.map((item) => (
                    <th key={item.id} className='font-poppins mt-8 py-2 px-5 text-center'>
                        <p className='font-semibold text-xs leading-4'>{item.name}</p>
                    </th>
                ))}
            </tr>
            </thead>
            <tbody className='bg-white'  style={{ marginTop: '1rem' }}>
                {(filteredProducts || brandProducts)?.data?.map((product, index) => (
                    <>
                    <tr key={index} className='w-full relative'>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center gap-2 flex items-center">
                            <input type='checkbox' className='w-[14px] h-[14px] ml-2'/>
                            <Image 
                                width={33}
                                height={33}
                                objectFit='cover'
                                alt='product image'
                                className='rounded-lg'
                                src={`${product?.images?.length !== 0  ? product?.images[0]?.url : '/images/no-image.webp'}`}
                                
                            />
                            <div className='flex flex-col items-start'>
                                <p className='table-text capitalize'>{product.name}</p>
                                <p className='font-poppins text-[11px] font-[300] leading-4 text-[#000]'>ID: {product.id}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center table-text capitalize">{product?.views}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center table-text capitalize">{product?.likes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center table-text capitalize">#2000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center table-text capitalize">{product.orders_count}</td>
                        {product.active ? 
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center table-text capitalize text-[#00A85A]">Active</td>
                        : <td className="px-6 py-4 whitespace-nowrap text-sm text-center table-text capitalize text-[#EA0000]">Deactivated</td>}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center cursor-pointer"
                            onClick={() => toggleIsDropdown(index)}
                        >
                            ...
                        </td>
                    </tr>
                    {dropdown === index && (
                            <div className='absolute right-[.5rem] z-10'>
                                <div ref={dropdownRef} className="bg-[#ffff] shadow-lg rounded-lg p-4 font-inter w-[130px] h-[123px]">
                                    <Link href={`/products/${product.slug}`}><button className='dropdown-text text-[#0b101d] w-full text-left border-solid border-b-[1px] border-[#E4E4E4]'>Edit</button></Link>
                                    <button className='dropdown-text text-[#0b101d] border-solid border-b-[1px] w-full text-left border-[#E4E4E4]' onClick={() => handleDeactivation(product.slug)}>Deactivate</button>
                                    <button className='dropdown-text text-[#EA0000] w-full text-left' onClick={() => handleDelete(product.slug)}>Delete</button>
                                </div>
                            </div>
                    )}
                    
                    </>
                ))}
            </tbody>
    </table>
    </div>
    {/* MOBILE VIEW */}
    <div className='md:hidden flex gap-8 flex-wrap items-center justify-center mt-6'>
        {brandProducts?.data?.map((product, index) => (
            <div key={index} className='w-[337px] min-[500px]:w-[400px] h-[237px] bg-white rounded-md px-4 py-2 relative'>
                <h1 className='mobile-table-text'>Product Name</h1>
                <div className='flex gap-12 w-[100%] min-[500px]:w-[90%] min-[500px]:gap-[4rem] items-center mt-2'>
                    {/* product name */}
                    <div className='flex gap-2 items-center w-[60%]'>
                        <Image 
                            width={33}
                            height={33}
                            objectFit='cover'
                            alt='product image'
                            className='rounded-lg'
                            
                            src={`${product?.images?.length !== 0  ? product?.images[0]?.url : '/images/no-image.webp'}`}
                        />
                        <div className='flex flex-col items-start'>
                            <p className='mobile-table-text capitalize '>{product.name}</p>
                            <p className='mobile-table-subtext'>ID: {product.id}</p>
                        </div>
                    </div>
                    {/* Category */}
                    <div className='w-[40%]'>
                        <h1 className='mobile-table-text'>Views</h1>
                        <p className='mobile-table-subtext'>{product?.views}</p>
                    </div>
                </div>
                <div className='flex w-[100%] min-[500px]:w-[90%] gap-12 min-[500px]:gap-[4rem] items-center mt-2'>
                    {/* likes*/}
                    <div className='w-[60%]'>
                        <h1 className='mobile-table-text'>Likes</h1>
                        <p className='mobile-table-subtext'>{product?.likes}</p>
                    </div>
                    {/* orders */}
                    <div className='w-[40%]'>
                        <h1 className='mobile-table-text'>Orders</h1>
                        <p className='mobile-table-subtext'>{product?.orders_count}</p>
                    </div>
                </div>
                <div className='flex gap-12 w-[100%] min-[500px]:w-[90%] min-[500px]:gap-[4rem] items-center mt-2'>
                    {/* status */}
                    <div className='w-[60%]'>
                        <h1 className='mobile-table-text'>Status</h1>
                        {product?.active ? 
                            <p className='text-[#00A85A] mobile-table-subtext'>Active</p> :
                            <p className='text-[#EA0000] mobile-table-subtext'>Deactivated</p>
                        }
                    </div>
                    {/* orders */}
                    <div className='w-[40%]'>
                        <h1 className='mobile-table-text'>Stock</h1>
                        <p className='mobile-table-subtext'>#20,000</p>
                    </div>
                </div>
                <div className='absolute right-0 pt-4 pr-2 cursor-pointer top-0' onClick={() => toggleDropdown(index)}>
                    <HiOutlineDotsVertical size={25}/>
                </div>
                {openDropdown === index && (
                    <div className='absolute md:hidden top-[2.2rem] right-[1rem] z-10'>
                        <div ref={dropdownRef} className="bg-[#ffff] shadow-lg rounded-lg p-4 font-inter w-[130px] h-[123px]">
                            <Link href={`/products/${product.slug}`}><button className='dropdown-text text-[#0b101d] w-full text-left border-solid border-b-[1px] border-[#E4E4E4]'>Edit</button></Link>
                            <button className='dropdown-text text-[#0b101d] border-solid border-b-[1px] w-full text-left border-[#E4E4E4]' onClick={() => handleDeactivation(product.slug)}>Deactivate</button>
                            <button className='dropdown-text text-[#EA0000] w-full text-left' onClick={() => handleDelete(product.slug)}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
            
        ))}
    </div>
    </>
    
    </div>
  )
}

export default Table