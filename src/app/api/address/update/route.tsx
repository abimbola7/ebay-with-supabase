import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";
import { cookies } from "next/headers";
import { Database } from "@/app/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function PUT(req:NextRequest) {
  const cookieStore = cookies()
  const body = await req.json()
  const supabase = createServerComponentClient<Database>({
    cookies : () => cookieStore
  })
  try {
    const { data :{
      user
    }, error } = await supabase.auth.getUser()
    if (!user || error) Error
    const res = await prisma.address.update({
      where : { id : Number(body.addressId) },
      data : {
        address : body.address,
        city : body.city,
        country : body.country,
        name : body.name,
        zipcode : body.zipcode,
      }
    })
  }catch(error) {
    console.log(error)
  }
}