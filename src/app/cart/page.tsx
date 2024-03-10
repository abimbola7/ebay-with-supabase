"use client"

import React from "react";
import MainLayout from "../(layouts)/mainlayout";
import SimilarProducts from "../(components)/similarproducts";
import CartItem from "../(components)/cartitem";
import { CartInt } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { getCart, cartQuantity } from "@/store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch()
  const carts : CartInt[] = useSelector((state:RootState)=>state.cart.cart);
  const total = useSelector((state:RootState)=>state.cart.quantity);
  console.log(total, "TOTAL")
  const router = useRouter()
  const product = {
    id: 1,
    title: "Brown Leather Bag",
    description: "Lorem ipusm motherfucker",
    url: "https://picsum.photos/id/7",
    price: 2500,
  };
  const goToCheckout = () => {
    if (!total) {
      alert("You have nothing in your cart")
      return
    }
    router.push('/checkout ')
  }
  React.useEffect(()=>{
    dispatch(getCart());
    dispatch(cartQuantity())
  }, [dispatch])
  return (
    <MainLayout>
      <div className="max-w-[1200px] mx-auto mb-8" />
      <div className="text-2xl font-bold my-4">Shopping Cart</div>
      <div className="relative flex items-baseline justify-between gap-2">
        <div className="w-[65%]">
          {
            carts.map(product=>(
              <CartItem key={product.id} product={product}/>
            ))
          }
        </div>
        <div className="absolute top-0 right-0 m-2 md:w-[33%]">
          <div className="bg-white p-4 border">
            <button 
            onClick={()=>goToCheckout()}
            className="flex items-center justify-center bg-blue-600 w-full text-white font-semibold p-3 rounded-full mt-4">
              Go To Checkout
            </button>

            <div className="flex items-center justify-between mt-4 text-sm mb-1">
              <div>Items ({carts?.length})</div>
              <div>${((total) / 100).toFixed(2)}</div>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm">
              <div>Shipping:</div>
              <div>Free</div>
            </div>

            <div className="border-b border-gray-500" />

            <div className="flex items-center justify-between mt-4 text-lg font-semibold">
              <div>Subtotal</div>
              <div>${((total) / 100).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts />
    </MainLayout>
  );
};

export default Cart;
