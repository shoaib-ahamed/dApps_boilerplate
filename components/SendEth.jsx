import Moralis from 'moralis'
import React, { useContext, useState } from 'react'
import { useWeb3Transfer } from 'react-moralis'
import { DataContext } from '../store/GlobalState'
import Loader from './Loader'

const inputBox = `className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism`


const toast = (
    <div className="text-5xl text-white bg-yellow-500 top-4 right-6">
        i am transaction
    </div>
)




const SendEth = () => {

    const initialState = { receiver: '', amount: 0.2 }
    const [info, setInfo] = useState(initialState)
    const { receiver, amount} = info
    const [loading, setLoading] = useState(false)

    const [state , dispatch] = useContext(DataContext)

  


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
        console.log('is it working')
        await Moralis.enableWeb3()
        console.log('is it working after enableWeb3')
        console.log('receiver : ' , receiver)
        fetch({
            onSuccess: () => {
                setLoading(false)
                console.log('success')
            },
            onError: (error) => {
                console.log(error)
                dispatch({type: 'NOTIFY' , payload: {error: error}})
            }
        }) 
    }

  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
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

                {(loading)
              ? <Loader />
              : (
                <button
                  type="submit"
                  disabled={isFetching}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )} 
          
            </form>

            

             
          </div>
  )
}

export default SendEth