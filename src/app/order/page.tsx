import React from 'react'
import MainLayout from '../(layouts)/mainlayout'
import { CiDeliveryTruck } from "react-icons/ci"
import Link from 'next/link'


const OrderPage = () => {
  const orders = [
    {
      id : 1,
      stripe_id : "123456",
      name : "Oladosu",
      address : "Test",
      zipcode : "Test",
      city : "Test",
      country : "Test",
      total : 100,
      orderItem : [{
        id : 1,
        title : "School Books",
        url : "https://picsum.photos/id/20"
      }]
    }
  ]
  return (
    <MainLayout>
      <div className="mt-4 mx-auto px-2 max-w-[1200px] min-h-[50vh]">
        <div className="bg-white w-full p-6 min-h-[150px]">
          <div className="flex items-center text-xl">
            <CiDeliveryTruck className='text-green-500' size={35}/>
            <span className="pl-4">Orders</span>
          </div>

          {
            orders.map(order=>(
              <div className='text-sm pl-[50px]' key={order.id}>
                <div className="border-b py-1">
                  <div className="pt-2">
                    <span className="font-bold mr-2">
                      Stripe ID:
                    </span>
                    { order?.stripe_id }
                  </div>
                  <div className="pt-2">
                    <span className="font-bold mr-2">
                      Delivery Address:
                    </span>
                    { order?.name }, { order?.address }, { order?.city }, { order?.country }
                  </div>

                  <div className="pt-2">
                    <span className="font-bold mr-2">
                      Total:
                    </span>
                    ${
                      (order?.total)
                    }
                  </div>

                  <div className="flex items-center gap-4">
                    {
                      order?.orderItem.map(item=>(
                        <div className="flex items-center" key={item.id}>
                          <Link href="/" className="py-1 hover:underline text-blue-500 font-bold">
                            <img className="rounded" width={120} src={`${item.url}/120`} />
                            { item.title }
                          </Link>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default OrderPage
