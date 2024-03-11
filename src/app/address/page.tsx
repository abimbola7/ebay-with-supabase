"use client"
import React, { FormEvent } from 'react'
import MainLayout from '../(layouts)/mainlayout'
import TextInput from '../(components)/textinput'
import { useRouter } from 'next/navigation'
import useSupabase from '../(hooks)/useSupabase'
import useIsLoading from '../(hooks)/useIsLoading'
import useUserAddress from '../(hooks)/useUserAddress'
import useCreateAddress from '../(hooks)/useCreateAddress'
import { toast } from 'react-toastify'
import ClientOnly from '../(components)/clientonly'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const AddressPage = () => {
  const router = useRouter();
  const { user } = useSupabase()
  const { createAddress } = useCreateAddress()
  const { eDonLoad } = useIsLoading()
  const { userAddress } = useUserAddress()
  const [ name, setName ] = React.useState<string | ''>('')
  const [ address, setAddress ] = React.useState<string | ''>('')
  const [ addressId, setAddressId ] = React.useState<string | '' | null>(null)
  const [ zipcode, setZipcode ] = React.useState<string | ''>('')
  const [ city, setCity ] = React.useState<string | ''>('')
  const [ country, setCountry ] = React.useState<string | ''>('')
  const [ isUpdatingAddress, setIsUpdatingAddress ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<{ type? : string; message? : string }>({})


  const showError = (type : string) => {
    if (Object.entries(error).length > 0 && error?.type === type) {
      return error.message;
    }
    return ""
  }

  const getAddress = async () => {
    if (user?.id == null || user?.id == undefined) {
      //  useIsLoading(false)
      eDonLoad(false)
      return;
    }
    const response = await userAddress(user.id);
    console.log(response)
    if (response) {
      setCurrentAddress(response)
      eDonLoad(false)
    }
    eDonLoad(false)
  }

  const setCurrentAddress = (response:any) => {
    setAddressId(response.id)
    setName(response.name)
    setAddress(response.address)
    setZipcode(response.zipcode)
    setCity(response.city)
    setCountry(response.country)
  }

  const validate = () => {
    let isError = false
    setError({})

    if (!name) {
      setError({ type : "name", message : "A name is required" })
      isError = true;
    } else if (!address) {
      setError({ type : "address", message : "An address is required" })
      isError = true;
    } else if (!city) {
      setError({ type : "city", message : "A city is required" })
      isError = true;
    } else if (!zipcode) {
      setError({ type : "zipcode", message : "A zipcode is required" })
      isError = true;
    } else if (!country) {
      setError({ type : "country", message : "A country is required" })
      isError = true;
    }
    return isError
  }

  const submit  = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let isError = validate()
    if (isError) {
      toast.error(error.message, {
        autoClose : 3000
      })
      return
    }
    try {
      setIsUpdatingAddress(true)
      const res  = await createAddress({
        address,
        addressId,
        city,
        country,
        name,
        zipcode
      })
      console.log(res)
      setCurrentAddress(res);
      setIsUpdatingAddress(false);
      toast.success("Address updated", {
        autoClose : 3000
      })
      router.push(`/checkout`)
    } catch(error){
      setIsUpdatingAddress(false);
      console.log(error)
    }
  }

  React.useEffect(()=>{
    eDonLoad(true)
    getAddress()
  }, [user])
  return (
    <MainLayout>
      <div className="mt-4 mx-auto px-2 max-w-[600px]">
        <div className="mx-auto bg-white rounded-lg p-3">
          <div className="text-xl font-bold mb-2">
            Address Details
          </div>
          <form
          onSubmit={submit}
          >
            <div className="mb-4">
              <ClientOnly>
                <TextInput 
                className="w-full" 
                string={name}
                onUpdate={setName}
                placeholder='Name'
                error={showError('name')}
                />
              </ClientOnly>
            </div>
            <div className="mb-4">
              <ClientOnly>
                <TextInput 
                className="w-full" 
                string={address}
                onUpdate={setAddress}
                placeholder='Address'
                error={showError('address')}
                />
              </ClientOnly>
            </div>
            <div className="mb-4">
              <ClientOnly>
                <TextInput 
                className="w-full" 
                string={city}
                onUpdate={setCity}
                placeholder='City'
                error={showError('city')}
                />
              </ClientOnly>
            </div>
            <div className="mb-4">
              <ClientOnly>
                <TextInput 
                className="w-full" 
                string={country}
                onUpdate={setCountry}
                placeholder='Country'
                error={showError('country')}
                />
              </ClientOnly>
            </div>
            <div className="mb-4">
              <ClientOnly>
                <TextInput 
                className="w-full" 
                string={zipcode}
                onUpdate={setZipcode}
                placeholder='Zipcode'
                error={showError('zipcode')}
                />
              </ClientOnly>
            </div>
            <button 
            type='submit'
            disabled={isUpdatingAddress}
            className={`mt-6 w-full text-white text-lg font-semibold p-3 rounded bg-blue-600 disabled:bg-blue-300`}>
              {
                !isUpdatingAddress ? 
                <div className=''>Update Address</div>:
                <div className='flex items-center jutsify-center gap-2'>
                  <AiOutlineLoading3Quarters className='animate-spin'/>
                  Please wait...
                </div>
              }
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default AddressPage
