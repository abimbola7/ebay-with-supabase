import React from 'react'
import { Products } from '../page'
import ProductItem from './productitem'
import { BiLoader } from 'react-icons/bi'




const SimilarProducts = () => {
  const products : Products[] = [
    {
      id : 1,
      title : "Brown Leather Bag",
      description : "Lorem ipusm motherfucker",
      url : "https://picsum.photos/id/7",
      price : 2500
    },
    {
      id : 2,
      title : "School Books",
      description : "Lorem ipusm motherfucker",
      url : "https://picsum.photos/id/20",
      price : 1999
    },
  ]
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
