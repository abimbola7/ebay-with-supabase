"use client"
import {createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from 'next/link'
import React from 'react'
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from '@supabase/auth-ui-shared'

export const supabase = createClientComponentClient()

const AuthPage = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-white">
        <div className="w-full items-center justify-center p-5 border-b-gray-300">
          <Link href="/" className="min-h-[170px]">
            <img src="/images/logo.svg" alt="" width={170}/>
          </Link>
        </div>

        <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
          Login / Register
        </div>

        <div className="mx-auto px-2 max-w-[400px]">
          <Auth
          supabaseClient={supabase}
          onlyThirdPartyProviders
          providers={['google']}
          appearance={{
            theme : ThemeSupa
          }}
          redirectTo={`${window.location.origin}/auth/callback`}
          // queryParams={{
          //   access_params : "offline",
          //   prompt : "consent",
          //   hd : "domain.com"
          // }}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthPage
