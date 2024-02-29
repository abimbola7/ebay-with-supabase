import Image from "next/image";
import MainLayout from "./(layouts)/mainlayout";
import MyCarousel from "./(components)/carousel";
import ProductItem from "./(components)/productitem";

interface Products {
  id : number;
  title : string;
  description : string;
  url : string;
  price : number;
}


export default function Home() {
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
