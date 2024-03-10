"use client"

import SimilarProducts from '@/app/(components)/similarproducts'
import MainLayout from '@/app/(layouts)/mainlayout'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addToCart, isItemAddedToCart, removeFromCart } from '@/store/cartSlice'
import { toast } from 'react-toastify'
import { CartInt } from '@/store/cartSlice'
import useIsLoading from '@/app/(hooks)/useIsLoading'


const ProductPage = ({ params } : { params : { id : string } }) => {
  const { eDonLoad } = useIsLoading()
  const dispatch = useDispatch()
  const isCartAdded = useSelector<RootState>(state=>state.cart.isItemAdded)
  const [ product, setProduct ] = React.useState<CartInt>({})
  console.log()

  const getProduct = async () => {
    eDonLoad(true);
    try {
      const res = await fetch(`/api/product/${params.id}`)
      const result = await res.json()
      setProduct(result)
      dispatch(isItemAddedToCart(result))
      eDonLoad(false)
    }catch(error) {
      toast.error("Something went wrong", {
        autoClose : 3000
      })
      eDonLoad(false)
    }
  }

  React.useEffect(()=>{
    getProduct()
  },[dispatch])


  return (
    <MainLayout>
      <div className='flex px-4 py-10'>
        {
          product.url ? 
          <img src={`${product.url}/280`} alt="" className='w-[40%] rounded-lg' /> :
          <div className="w-[40%]"></div>
        }

        <div className="px-4 w-full">
          <div className='px-4 w-full'>
            <div className='font-bold text-xl'>{ product.title }</div>
            <div className='text-sm text-gray-700 pt-2'>Brand New Full Warranty</div>
            <div className="border-b py-1"/>
            <div className="pt-3 pb-2">
              <div className="flex items-center">
                Condition: {" "} <span className="font-bold text-[17px]">New</span>
              </div>
            </div>
            <div className="border-b py-1"/>
            <div className="pt-3 ">
              <div className="w-full flex items-center  justify-between">
                <div className="flex items-center">
                  <div className="font-bold text-[20px] ml-2">${(product.price ? product.price / 100 : 0 ).toFixed(2)}</div>
                </div>
                <button 
                onClick={
                  () => {
                    if (isCartAdded) {
                      dispatch(removeFromCart(product))
                      toast.info("Removed from cart", { 
                        autoClose : 3000
                       })
                    } else {
                      dispatch(addToCart(product));
                      toast.success("Added to cart", {
                        autoClose : 3000
                      })
                    }
                    dispatch(isItemAddedToCart(product))
                  }
                }
                className={`${ isCartAdded ? 'bg-yellow-400 hover:bg-yellow-600' : 'bg-blue-400 hover:bg-blue-600' } text-white py-2 px-3 rounded-md`}>
                  {
                    isCartAdded ? 'Remove From Cart' : 'Add to Cart'
                  }
                </button>
              </div>
            </div>
            <div className="border-b py-1">
              <div className="pt-3">
                <div className='font-semibold pb-1'>Description</div>
                <div className="text-sm">{ product.description }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts />
    </MainLayout>
  )
}

export default ProductPage
