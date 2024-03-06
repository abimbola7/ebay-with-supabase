import React from 'react'

const ClientOnly = ({children} : {
  children : React.ReactNode;
}) => {
  const [ isClient, setIsClient ] = React.useState<boolean>(false)

  React.useEffect(()=>{
    setIsClient(true)
  }, [])
  return (
    <>
     {
      isClient ? <div>{ children }</div> : null
     } 
    </>
  )
}

export default ClientOnly
