import Moralis from 'moralis'
import React, { useState } from 'react'
import { useWeb3Transfer } from 'react-moralis'

const inputBox = `className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism`


const SendEth = () => {
    const initialState = { receiver: '', amount: 0.2 }
    const [info, setInfo] = useState(initialState)
    const { receiver, amount} = info

    const handleChangeInput = e => {
        const {name, value} = e.target
        setInfo({...info, [name]:value})
    }

    const {fetch , isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH("0.004"),
        receiver: receiver,
        type: "native"
    })

    const handleSubmit = async e => {
        e.preventDefault()
        await Moralis.enableWeb3()
        console.log('receiver : ' , receiver)
        fetch({
            onSuccess: () => {
                console.log('success')
            },
            onError: (error) => {
                console.log(error)
            }
        }) 
    }

  return (
    <div className="flex flex-col justify-start items-center p-5 w-[300px] md:w-[360px] lg:w-full blue-glassmorphism">
            <form className="mx-auto my-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-white" htmlFor="name">Receiver</label>
                    <input type="text" className={inputBox}
                    name="receiver" value={receiver} onChange={handleChangeInput} />
                </div>
                
                <div className="form-group">
                    <label className="text-white">Amount</label>
                    <input className={inputBox} type="amount" name="amount" value={amount} onChange={handleChangeInput} />
                </div>

                <div className="h-[1px] w-full bg-gray-400 my-2" />
               
                <button
                  type="submit"
                  disabled={isFetching}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
           
          
            </form>

            

             
          </div>
  )
}

export default SendEth