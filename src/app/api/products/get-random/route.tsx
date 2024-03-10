import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";


export async function GET(req:NextRequest, params : { name : string }) { 
  // const user_id = params.user_id
  try {
    const productCount = await prisma.products.count();
    const skip = Math.floor(Math.random() * productCount)
    const products = await prisma.products.findMany({
      take : 5,
      skip : skip,
      orderBy : {
        id  : "asc"
      }
    })
    await prisma.$disconnect();
    return NextResponse.json(products);
  } catch(error) {
    console.log(error)
    await prisma.$disconnect();
    return NextResponse.json({ message : error },  { status : 500 })
  }
} 