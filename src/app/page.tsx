"use client"
import React from "react";
import Image from "next/image";
import MainLayout from "./(layouts)/mainlayout";
import MyCarousel from "./(components)/carousel";
import ProductItem from "./(components)/productitem";
import useIsLoading from "./(hooks)/useIsLoading";
import { BsChevronDown } from "react-icons/bs";

export interface Products {
  id : number;
  title : string;
  description : string;
  url : string;
  price : number;
}


export default function Home() {
  const { eDonLoad } = useIsLoading()
  const [ products, setProducts ] = React.useState<Products[]>([]);

  const fetchProducts = async () => {
    eDonLoad(true);
    try {
      const res = await fetch(`/api/products`)
      if (!res.ok) {
        throw Error("Something went wrong")
      }
      const results = await res.json()
      setProducts(results)
      eDonLoad(false);
    }catch(error){
      console.log(error)
      eDonLoad(false);
    }
  }

  const fetchAddress = async () => {
    const res = await fetch(`/api/address/1234`)
    const data = await res.json()
    console.log(data)
  }

  React.useEffect(()=>{
    // fetchAddress()
    fetchProducts();
  },[])

  return (
    <MainLayout>
      <MyCarousel />
      <div className="max-w-[1200px] mx-auto">
        <div className="text-2xl font-bold mt-4 mb-6 px-4">
          Products
        </div>
        <div className="grid grid-cols-5 gap-4">
          {
            products.map(product=>(
              <ProductItem
              id={product.id} 
              key={product.id}
              title={product.title}
              description={product.description}
              url={product.url}
              price={product.price}
              />
            ))
          }
        </div>
      </div>
    </MainLayout>
  );
}
