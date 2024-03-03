import React from 'react'
import MainLayout from '../(layouts)/mainlayout'
import CheckoutItem from "../(components)/checkoutitem"

const CheckoutPage = () => {
  const product = {
    id : 1,
    title : "Brown Leather Bag",
    description : "Lorem ipusm motherfucker",
    url : "https://picsum.photos/id/7",
    price : 2500
  }

  return (
    <MainLayout>
      <div className='mt-4 max-w-[1100px] mx-auto'>
        <div className="text-2xl font-bold my-4">
          <div className="relative flex items-baseline gap-4 justify-between mx-auto w-full">
            <div className="w-[65%]">
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-xl font-semibold mb-2">Shipping Address</div>
                <div>
                  <ul className="text-sm mt-2">
                    <li>Name : test</li>
                    <li>Address : test</li>
                    <li>Zipcode : test</li>
                    <li>City : test</li>
                    <li>Country : test</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg mt-4">
                <CheckoutItem key={product.id} product={product}/>
              </div>
            </div>

            <div className="relative border rounded-lg -top-[16px] w-[35%]">
              <div className="p-4">
                <div className="flex items-baseline justify-between text-sm mb-1">
                  <div>Items (3)</div>
                  <div>$12.99</div>
                </div>
                <div className="flex items-baseline justify-between text-sm mb-4">
                  <div>Shipping</div>
                  <div>Free</div>
                </div>
                <div className="border-t"/>
                <div className="flex items-center justify-between my-4">
                  <div className="font-semibold">Order total</div>
                  <div className="text-2xl font-semibold">
                    $12.99
                  </div>
                </div>

                <form>
                  <div className="border border-gray-500 p-2 rounded-sm"/>
                    <p role='alert' className="text-red-700 font-semibold relative top-2"/>
                    <button className="mt-4 bg-blue-600 text-lg text-white font-semibold p-3 rounded-full">
                      Confirm and Pay
                    </button>
                </form>
              </div>

              <div className="flex items-center p-4 justify-center gap-2 border-t">
                <img src="/images/logo.svg" alt="" width={50} />
                <div className="font-light my-2">
                  MONEY BACK GUARANTEE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CheckoutPage
