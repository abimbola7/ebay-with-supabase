import React from 'react'
import TopMenu from './includes/topmenu'
import MainHeader from './includes/mainheader'
import SubMenu from './includes/submenu'
import Footer from './includes/footer'


interface LayoutProps {
  children : React.ReactNode
}

const MainLayout = (props : LayoutProps) => {
  return (
    <>
      <div className='min-w-[1050px] max-w-[1300px] mx-auto'>
        <div>
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