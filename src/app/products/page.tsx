"use client"

import React, { useEffect, useState } from 'react'
import SidebarWrapper from '../components/sidebar/SidebarWrapper'
import Logo from '../components/Logo'
import Heading from '../components/heading/Heading'
import Table from '../components/table/Table'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/store'
import { BrandProductsType, Product } from '@/types'
import LoadingSpinner from '../components/loaders/LoadingSpinner'
import ReactPaginate from 'react-paginate'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import DashboardLayout from '../DashboardLayout'



const ProductPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [brandProducts, setBrandProducts] = useState<BrandProductsType | any>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState<BrandProductsType | null>(null); 
  

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    
  const user = useSelector((state: RootState) => state.user.email)
    

    // GET A BRAND PRODUCTS
    const getBrandProducts = async () => {
      
        try {
          setLoading(true);
          const config = {
              headers: { Authorization: `Bearer ${user?.access_token}` }
          };
          const response = await axios.get(
            `https://love.thegoldscarf.com/api/brand/product?page=${currentPage}`, 
            config
          );
          console.log(response.data)
          setBrandProducts(response.data);
          
          setTotalPages(response.data.meta.last_page);
        } catch (error) {
          console.log(error);
         
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        getBrandProducts();
    }, [currentPage]);

    const handleUpdateProducts = () => {
        // Fetch updated product data after deletion
        getBrandProducts();
    };

    console.log({ brandProducts })

    const handlePageChange = ({ selected }: { selected: number }) => {
      setCurrentPage(selected + 1);
    };

       // Filter products based on search input
       const handleSearch = (searchInput: string) => {
        if (!searchInput) {
            setFilteredProducts(null);
        } else {
            const filtered = (brandProducts.data as Product[]).filter((product: Product) =>
            product.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      
            setFilteredProducts({ ...brandProducts, data: filtered });
        }
    };

    useEffect(() => {
        handleSearch('');
    }, [brandProducts]);

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchInput(value);
        handleSearch(value);
    };

  return (
    <DashboardLayout>
    <div className='bg-[#fafafa] w-[100%] h-full'>
      <div className='py-6 w-[100%] pr-[30px] pl-[40px] min-h-[100vh]'>
        <Heading 
            title='Products' placeholder='Search for a product' 
            searchInput={searchInput} onChange={handleInputChange}
            buttonText='Add Product' link='add-product'
            category='products'
        />
        {/* Table */}
        {loading && <div className='flex justify-center items-center'>
            <p>Loading... Please Wait</p>  
        </div>}
        
        {!loading && (filteredProducts && filteredProducts?.data?.length > 0 || brandProducts?.data?.length > 0) && 
           <Table 
           onUpdateProducts={handleUpdateProducts} brandProducts={filteredProducts || brandProducts} 
           setBrandProducts={setBrandProducts} filteredProducts={filteredProducts}
           />
        }
      
        
        {/* Display message if no products available */}
        {!loading && brandProducts && brandProducts?.data?.length === 0 && brandProducts.data.meta.current_page < 2 &&
          <div className='mt-6'>
              <h1 className='font-open text-[#000] text-xl font-[500]'>No Products</h1>
          </div>
        }
       

        {!loading && brandProducts.length < 1 &&
          <div className='mt-6'>
            <h1 className='font-open text-[#000] text-xl font-[500]'>No Products.</h1>
          </div>
        }

        {(filteredProducts && filteredProducts.data.length > 10) &&
          <ReactPaginate
            pageCount={totalPages}
            previousLabel={<IoIosArrowBack className={'page-icon'} />}
            nextLabel={<IoIosArrowForward className={'page-icon'} />}
            breakLabel={'...'}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName={'page'}
            disabledClassName={"disableBtn"}
          />}

          {(totalPages > 1) && 
            <ReactPaginate
                pageCount={totalPages}
                previousLabel={<IoIosArrowBack className={'page-icon'} />}
                nextLabel={<IoIosArrowForward className={'page-icon'} />}
                breakLabel={'...'}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'page'}
                disabledClassName={"disableBtn"}
            />
        
        }
      </div>

      
    </div>
    </DashboardLayout>
  )
}

export default ProductPage