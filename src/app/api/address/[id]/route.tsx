import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/app/database.types";

// export async function GET(req:NextRequest) {
//   const cookieStore = cookies();
//   const supabase = createServerComponentClient<Database>({
//     cookies : () => cookieStore
//   })
//   const { data, error } = await supabase.from("Products").select()
//   return NextResponse.json({ data }, { status : 200 })
// }


interface Products {
  title : string;
  description : string;
  url : string;
  price : number
}


export async function GET(req:NextRequest ) { 
  // const user_id = params.user_id
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies : () => cookieStore
  })

  try {
    const { data :{
      user
    }, error } = await supabase.auth.getUser()
    if (!user) Error
    const res = await prisma.address.findFirst({
      where : {
        user_id : user?.id
      }
    })
    console.log(res, "RES")
    await prisma.$disconnect();
    return NextResponse.json({ res }, { status : 200 })
  } catch(error) {
    console.log(error)
    await prisma.$disconnect();
    return NextResponse.json({ message : error },  { status : 500 })
  }
}

