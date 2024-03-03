"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { LayoutProps } from "../(layouts)/mainlayout"

interface UserContextType {
  name: string;
  age: number;
  updateUser: (name: string, age: number) => void;
}

const Context = createContext(null)




const Provider = ({ children } : { children : LayoutProps }) => {
  const router  = useRouter()
  const [ user, setUser ] = useState(null)
  const [ id, setId ] = useState(null)
  const [ email, setEmail ] = useState(null)
  const [ name, setName ] = useState(null)
  const [ picture, setPicture ] = useState(null)


  const supabaseClient = createClientComponentClient();


  const getCurrentSession = async () => {
    const res = await supabaseClient.auth.getSession()
  }
}