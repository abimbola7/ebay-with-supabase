import prisma from "@/app/libs/prisma";
import type { Database } from "@/app/database.types";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AiOutlineConsoleSql } from "react-icons/ai";


export async function GET(req:NextRequest) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies : () => cookieStore
  })

  try {
    console.log("working??")
    const { data :{
      user
    }, error } = await supabase.auth.getUser()
    if (!user) Error;
    const orders = await prisma.orders.findMany({
      where : {
        user_id : user?.id
      },
      orderBy : { id : "desc" },
      include : {
        orderItem : {
          include : {
            product : true
          }
        }
      }
    })
    await prisma.$disconnect()
    return NextResponse.json(orders)
  } catch(error) {
    console.log(error)
    await prisma.$disconnect()
    return NextResponse.json({ error },  { status : 500 })
  }
}