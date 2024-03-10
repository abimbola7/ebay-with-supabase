interface Address {
  addressId : string | null | '' | number;
  name : string  | '';
  address : string | null | '';
  zipcode : string | null | '';
  city : string | null | '';
  country : string | null | '';
}

const useCreateAddress = () => {
  const createAddress = async (details : Address) => {
    let url = 'create';
    if (details.addressId) url = "update"
    console.log(url)

    const response = await fetch(`api/address/${url}`, {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        addressId : details.addressId,
        name : details.name,
        address  : details.address,
        city : details.city,
        country : details.country, 
        zipcode : details.zipcode
      })
    })

    const data = await response.json();
    return data
  }
  return {
    createAddress
  }
} 

export default useCreateAddress