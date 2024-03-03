"use client"

import React from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'


interface User {
  id : string
}

const useSupabase = () => {
  const [ user, setUser ] = React.useState<User | null>(null)
  const [ id, setId ] = React.useState<string | null>(null)
  const [ email, setEmail ] = React.useState<string | null>(null)
  const [ name, setName ] = React.useState<string | null>(null)
  const [ picture, setPicture ] = React.useState<string | null>(null)

  const router = useRouter();
  const getSession = async () => {
    const { 
      data : {
        session
      }
     } = await supabase.auth.getSession()
     getCurrentUser(session)
     return session
  }

  const getCurrentUser = (session:any) => {
    if (session && session.user){
      const user = session.user
      setUser(user);
      setId(user.id);
      setEmail(user.email)
      setName(user.user_metadata.name)
      setPicture(user.user_metadata.avatar_url)
    }
  }

  // const refreshSession = async () => {
  //   const { data, error } = await supabase.auth.refreshSession()
  //   return session;
  // }

  const setSession = async (access_token:string, refresh_token:string) => {
    const {
      data : {
        session
      }
    } = await supabase.auth.setSession({
      access_token,
      refresh_token
    })
    console.log(session)
    return true;
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.reload();
  }

  React.useEffect(()=>{
    getSession()
  },[])

  return {
    user,
    id,
    name,
    email,
    picture,
    setSession,
    signOut
  }
}

export default useSupabase
