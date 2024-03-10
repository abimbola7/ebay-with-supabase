"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { getCart, CartInt, cartCount } from '@/store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../(layouts)/mainlayout'
import CheckoutItem from "../(components)/checkoutitem"
import useSupabase from '../(hooks)/useSupabase'
import { RootState } from '@/store'
import { toast } from 'react-toastify'
import debounce from 'debounce'
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js'
import useIsLoading from '../(hooks)/useIsLoading'

const CheckoutPage = () => {
  const { eDonLoad } = useIsLoading()
  const router = useRouter()
  const { user } = useSupabase()
  const dispatch = useDispatch()
  const cart = useSelector((state:RootState)=>state.cart.cart);
  console.log(cart)
  const total = useSelector((state:RootState)=>state.cart.total);
  const [ tots, setTots ] = React.useState(total)
  console.log(total)
  let stripe = React.useRef<Stripe | null>(null);
  let elements = React.useRef<StripeElements | null >(null);
  let card  = React.useRef<StripeCardElement | null>(null);
  let clientSecret = React.useRef(null);


  const [ addressDetails, setAddressDetails ] = React.useState({})
  const [ isLoadingAddress, setIsLoadingAddress ] = React.useState<boolean>(false)
  const product = {
    id : 1,
    title : "Brown Leather Bag",
    description : "Lorem ipusm motherfucker",
    url : "https://picsum.photos/id/7",
    price : 2500
  }

  const stripeInit = async () => {
    stripe.current = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "")
    const res = await fetch(`api/stripe`, {
      method : "POST",
      body : JSON.stringify({
        amount : 10000
      })
    })
    const result = await res.json();
    console.log(result)
    clientSecret.current = result.client_secret;
    if (stripe.current) {
      elements.current = stripe.current.elements() 
    }
    let style  = {
      base : { fontSize : "18px" },
      invalid : {
        fontFamily : "Arial sans-serif",
        color : "#ee4b2b",
        iconColor : "#ee4b2b"
      }
    }

    const cardElement = elements.current?.create("card", {
      hidePostalCode : true,
      style : style
    })
    if (cardElement) {
      card.current = cardElement
      console.log(card.current)
    }
    card.current?.mount("#card-element");

    if (card.current) {
      console.log("hdhvbv ibeibc")
      card.current.on("change", function (event) {
        console.log("WORKING???")
        const button = document.querySelector("button")
        console.log(button)
        if (button !== null) {
          console.log("button isn't null")
          button.disabled = event.empty
        }
        const cardError = document.querySelector("#card-error")
        if (cardError !== null) {
          console.log("CARD isn't null")
          cardError.textContent = event.error ? event.error.message : ""
        }
      })  
    }
    eDonLoad(false)
  }

  React.useEffect(()=>{
    eDonLoad(true)
    dispatch(getCart())
    console.log(total);
    setTimeout(() => {
      stripeInit()
    }, 300);
  }, [dispatch])

  return (
    <MainLayout>
      {
        total >0 ? (

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
                  {
                    cart.map(product=>(
                      <CheckoutItem key={product.id} product={product}/>
                    ))
                  }
                </div>
              </div>

              <div className="relative border rounded-lg -top-[16px] w-[35%]">
                <div className="p-4">
                  <div className="flex items-baseline justify-between text-sm mb-1">
                    <div>Items ({total})</div>
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
                    <div className="border border-gray-500 p-2 rounded-sm" id='card-element'/>
                      <p role='alert' className="text-red-700 font-semibold relative top-2" id='card-error'/>
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
        ) : (
          <div className="text-center my-20">
            Your Cart is Empty! <button onClick={()=>router.back()}  className='bg-yellow-500 px-2 py-1 rounded-md'>Go Back</button>
          </div>
        )
      }
    </MainLayout>
  )
}

export default CheckoutPage
