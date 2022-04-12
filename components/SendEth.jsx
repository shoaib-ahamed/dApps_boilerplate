import React, { useState } from 'react'
import Loader from './Loader'

const Input = ({placeholder , name , type , value , handleChange}) => (
    <input 
    type="text" 
    placeholder={placeholder} 
    step="0.0001" 
    value={value} 
    onChange={(e) => handleChange(e,name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  )

const SendEth = () => {

    const [amount , setAmount] = useState(0)

    const handleSubmit = () => {}

  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
             <Input placeholder="Address To" name="addressTo" type="text" handleChange={()=> { }}/>
             <Input placeholder="Amout (ETH)" name="amout" value={amount} type="text" handleChange={()=> { }}/>
             <Input placeholder="Keyboard (Gif)" name="keyboard" type="text" handleChange={()=> { }}/>
             <Input placeholder="Enter Messege" name="messege" type="text" handleChange={()=> { }}/>

             <div className="h-[1px] w-full bg-gray-400 my-2" />

             {false
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
  )
}

export default SendEth