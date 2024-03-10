import Stripe from "stripe"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";
import { cookies } from "next/headers";
import { Database } from "@/app/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

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
    if (!user || error) Error
    const stripe =  new Stripe(process.env.STRIPE_SK_KEY || "");
    const res = await stripe.paymentIntents.create({
      amount : Number(body.amount),
      currency : "gbp",
      automatic_payment_methods : { enabled : true }
    })
    return NextResponse.json(res)
  }catch(error) {
    console.log(error)
    return NextResponse.json("Something went wrong", { status: 500 })
  }
}