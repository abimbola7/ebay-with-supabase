"use client"

import React from "react"
import { store } from "."
import { Provider } from "react-redux"

interface ProviderProps {
  children : React.ReactNode
}


export default function Providers(props : ProviderProps) {
  return (
    <Provider
    store={store}
    >
      { props.children }
    </Provider>
  )
}