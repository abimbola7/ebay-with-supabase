import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/app/libs/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/app/database.types";


export async function POST(req:NextRequest) {
  const cookieStore = cookies()
  const body = await req.json()
  const supabase = createServerComponentClient<Database>({
    cookies : () => cookieStore
  })
  try {
    const { data :{
      user
    }, error } = await supabase.auth.getUser()
    if (!user) Error
    const userId : string = user?.id || "" 
    const res = await prisma.address.create({
      data : {
        user_id : userId,
        address : body.address,
        city : body.city,
        country : body.country,
        name : body.name,
        zipcode : body.zipcode,
      }
    })
    return NextResponse.json(res)
  }catch(error) {
    console.log(error);
    return NextResponse.json({ message : error }, { status : 500 })
  }
}