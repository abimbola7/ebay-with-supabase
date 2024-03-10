import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";


export async function GET(req:NextRequest) { 
  // const user_id = params.user_id
  try {
    const products = await prisma.products.findMany()
    await prisma.$disconnect();
    return NextResponse.json(products)
  } catch(error) {
    console.log(error)
    await prisma.$disconnect();
    return NextResponse.json({ message : error },  { status : 500 })
  }
} 