import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/app/database.types";



interface Prod {
  id : number
}


export async function POST(req:NextRequest) {
  const body = await req.json()
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies : () => cookieStore
  })

  try {
    const { data :{
      user
    }, error } = await supabase.auth.getUser()
    if (!user) Error;
    const userId = user?.id || ""
    const order = await prisma.orders.create({
      data : {
        user_id : userId,
        address : body.address,
        city : body.city,
        country : body.country,
        name : body.name,
        stripe_id : body.stripe_id,
        total : Number(body.total),
        zipcode : body.zipcode,        
      }
    })

    body.products.forEach(async (prod : Prod) => {
      await prisma.orderItem.create({
        data : {
          order_id : order.id,
          product_id : prod.id
        }
      })
    })
    await prisma.$disconnect()
    return NextResponse.json("Order Complete", { status : 200 })
  } catch(error) {
    await prisma.$disconnect()
    console.log(error)
    return NextResponse.json({ error }, { status : 500 })
  }
}