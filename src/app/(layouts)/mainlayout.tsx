"use client"

import React, { useEffect } from 'react'
import TopMenu from './includes/topmenu'
import MainHeader from './includes/mainheader'
import SubMenu from './includes/submenu'
import Footer from './includes/footer'
import { loadBindings } from 'next/dist/build/swc'
import Loading from '../(components)/loading'


export interface LayoutProps {
  children : React.ReactNode
}

const MainLayout = (props : LayoutProps) => {
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false)

  useEffect(()=>{
    window.addEventListener("storage", () => {
      let res = localStorage.getItem("isLoading");
      res === "false" ? setIsLoading(false) : setIsLoading(true);
    })
  }, [])
  return (
    <>
      <div className='min-w-[1050px] max-w-[1300px] mx-auto'>
        <div>
          {
            isLoading && <Loading/>
          }
          <TopMenu />
          <MainHeader/>
          <SubMenu/>
          { props.children }
          <Footer />
        </div>
      </div>
    </>
  )
}

export default MainLayout