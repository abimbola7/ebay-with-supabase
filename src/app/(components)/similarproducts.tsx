"use client"

import React from 'react'
import { Products } from '../page'
import ProductItem from './productitem'
import { BiLoader } from 'react-icons/bi'
import useIsLoading from '../(hooks)/useIsLoading'




const SimilarProducts = () => {
  const { eDonLoad } = useIsLoading()
  const [ products, setProducts ] = React.useState<Products[]>([]);

  const fetchProducts = async () => {
    // eDonLoad(true);
    try {
      const res = await fetch(`/api/products/get-random`)
      if (!res.ok) {
        throw Error("Something went wrong")
      }
      const results = await res.json();
      console.log(results)
      setProducts(results)
      // eDonLoad(false);
    }catch(error){
      console.log(error)
      // eDonLoad(false);
    }
  }

  React.useEffect(()=>{
    fetchProducts();
  },[])
  return (
    <div>
      <div className="border-b py-1 max-w-[1200px] mx-auto"/>
      <div className='max-w-[1200px] mx-auto'>
        <div className="font-bold text-2xl py-2 mt-4">
          Similar Sponsored
        </div>

        {
          products.length > 0 ? (
            <div className="grid grid-cols-5 gap-4">
              {
                products.map(product=>(
                  <ProductItem 
                  key={product.id} 
                  id={product.id} 
                  title={product.title} 
                  description={product.description} 
                  price={product.price} 
                  url={product.url}/>
                ))
              }
            </div>
          ) : (
            <div className='flex items-center justify-center'>
              <div className="flex items-center justify-center gap-4 font-semibold">
                <BiLoader size={30} className='text-blue-400 animate-spin'/>
                Loading Products....
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SimilarProducts
