import React from 'react'

interface Product {
  title : string;
  description : string;
  url : string;
  price : number;
  id : number
}



const CartItem = ({ product } : {product : Product}) => {
  return (
    <div className="relative flex justify-start my-2 border w-full p-6">
      <img src={`${product.url}/150`} alt="" className="rounded-md w-[150px] h-[150px]" />

      <div className="overflow-hidden pl-2 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center font-semibold justify-between w-[400px] text-[16px] underline">
            { product?.title }
          </div>
          <div className="font-bold text-lg">
            ${(product?.price / 100).toFixed(2)}
          </div>
        </div>
        <div className="font-semibold mt-2">
          NEW
        </div>
        <div className="text-sm mt-2">
          { product?.description.substring(0, 150) }...
        </div>
        <div className="absolute right-0 bottom 0 p-4 text-sm">
          <button className='underline text-blue-500'>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem