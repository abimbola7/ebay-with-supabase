import React from 'react'
import MainLayout from '../(layouts)/mainlayout'
import TextInput from '../(components)/textinput'

const AddressPage = () => {
  return (
    <MainLayout>
      <div className="mt-4 mx-auto px-2 max-w-[600px]">
        <div className="mx-auto bg-white rounded-lg p-3">
          <div className="text-xl font-bold mb-2">
            Address Details
          </div>
          <form>
            <div className="mb-4">
              <TextInput className="w-full" string={'TEST'} placeholder='Name'/>
            </div>
            <button className="mt-6 w-full text-white text-lg font-semibold p-3 rounded bg-blue-600">
              Update Address
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default AddressPage
