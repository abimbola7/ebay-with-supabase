import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";




export async function GET(req:NextRequest, { params }  : { params : {id : string} }) { 
  // const user_id = params.user_id
  try {
    const { id } = params;
    const product = await prisma.products.findFirst({
      where : {
        id : Number(id)
      }
    })
    console.log(product)
    await prisma.$disconnect();
    return NextResponse.json(product)
  } catch(error) {
    console.log(error)
    await prisma.$disconnect();
    return NextResponse.json({ message : error },  { status : 500 })
  }
}