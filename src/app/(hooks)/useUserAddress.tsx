const useUserAddress = () => {
  let address = {}
  const userAddress = async () => {
    let response = await fetch(`/api/address/${'39aa2b8a-ba5c-4610-be97-510e7481826'}`)
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