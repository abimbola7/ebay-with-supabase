const useUserAddress = () => {
  let address = {}
  const userAddress = async (id:string) => {
    console.log(id)
    let response = await fetch(`/api/address/${id}`)
    if (response) {
      let data = await response.json()
      console.log(data.res)
      if (data) address = data.res
    }
    console.log(address)
    return address
  }
  return {
    userAddress
  }
}

export default useUserAddress;