"use client"
import React from 'react'
import MainLayout from '../(layouts)/mainlayout'
import { CiDeliveryTruck } from "react-icons/ci"
import Link from 'next/link'
import { toast } from 'react-toastify'
import useIsLoading from '../(hooks)/useIsLoading'
import useSupabase from '../(hooks)/useSupabase';
import moment from "moment"
import { CartInt } from '@/store/cartSlice'





interface OrderItem {
  id : number;
  order_id? : number;
  product_id? : number;
  product : CartInt
}


interface Orders {
  id? : number;
  user_id? : string;
  stripe_id? : string;
  name? : string;
  address? : string;
  zipcode? : string;
  city? : string;
  country? : string;
  total? : number;
  created_at : Date;
  orderItem : OrderItem[] | undefined
}

const OrderPage = () => {
  const { user } = useSupabase()
  const { eDonLoad } = useIsLoading()
  const [ orders, setOrders ] = React.useState<Orders[]>([])
  const getOrders  = async () => {
    try{
      if (!user?.id) {
        return 
      }
      const res = await fetch(`api/orders`)
      const result = await res.json()
      setOrders(result)
      eDonLoad(false)
    } catch(error) {
      toast.error("Something went wrong", {
        autoClose : 3000
      })
      eDonLoad(false)
    }
  }

  React.useEffect(()=> {
    eDonLoad(true)
    getOrders()
  }, [user])
  return (
    <MainLayout>
      <div className="mt-4 mx-auto px-2 max-w-[1200px] min-h-[50vh]">
        <div className="bg-white w-full p-6 min-h-[150px]">
          <div className="flex items-center text-xl">
            <CiDeliveryTruck className='text-green-500' size={35}/>
            <span className="pl-4">Orders</span>
          </div>

          {
           orders.length > 0 ? 
           (

             orders.map((order)=>(
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
  
                    <div className="pt-2">
                      <span className="font-bold mr-2">
                        Total:
                      </span>
                      ${
                        moment(order?.created_at).calendar()
                      }
                    </div>
  
                    <div className="pt-2">
                      <span className="font-bold mr-2">
                        Total:
                      </span>
                      ${
                        moment(order?.created_at).add(3, "days").calendar()
                      }
                    </div>
  
                    <div className="flex items-center gap-4">
                      {
                        order?.orderItem?.map(item=>(
                          <div className="flex items-center" key={item.id}>
                            <Link href={`/product/${item.product_id}`} className="py-1 hover:underline text-blue-500 font-bold">
                              <img className="rounded" width={120} src={`${item.product.url}/120`} />
                              { item.product.title }
                            </Link>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))
           ) : <div className='text-center'>You have no order history</div>
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default OrderPage
