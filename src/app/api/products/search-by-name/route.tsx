import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";


export async function GET(req:NextRequest, params : { name : string }) { 
  // const user_id = params.user_id
  const { name } = params
  try {
    const items = await prisma.products.findMany({
      take : 5,
      where : {
        title : {
          contains : name,
          mode : "insensitive"
        }
      }
    })
    await prisma.$disconnect();
    return NextResponse.json({ items }, { status : 200 })
  } catch(error) {
    console.log(error)
    await prisma.$disconnect();
    return NextResponse.json({ message : error },  { status : 500 })
  }
} 