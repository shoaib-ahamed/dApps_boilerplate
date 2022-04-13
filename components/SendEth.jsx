import Moralis from 'moralis'
import React, { useContext, useState } from 'react'
import { useWeb3Transfer } from 'react-moralis'
import { DataContext } from '../store/GlobalState'

const inputBox = `className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism`

const SendEth = () => {

    const initialState = { reciever: '', amount: 0.2 }
    const [info, setInfo] = useState(initialState)
    const { reciever, amount} = info
    const [loading, setLoading] = useState(false)

    const [state , dispatch] = useContext(DataContext)




    const {fetch , isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount),
        reciever: reciever,
        type: "native"
    })


    const handleChangeInput = e => {
        const {name, value} = e.target
        setInfo({...info, [name]:value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log('is it working')
        await Moralis.enableWeb3()
        console.log('is it working after enableWeb3')
        fetch({
            onSuccess: () => {
                console.log('success')
                dispatch({type: 'NOTIFY' , payload: {success: "Eth successfully sent"}})
            },
            onError: (error) => {
                dispatch({type: 'NOTIFY' , payload: {error: error}})
            }
        }) 
    }

  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <form className="mx-auto my-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-white" htmlFor="name">Reciever</label>
                    <input type="text" className={inputBox}
                    name="reciever" value={reciever} onChange={handleChangeInput} />
                </div>
                
                <div className="form-group">
                    <label className="text-white">Amount</label>
                    <input className={inputBox} type="amount" name="amount" value={amount} onChange={handleChangeInput} />
                </div>

                <div className="h-[1px] w-full bg-gray-400 my-2" />

                {/* {(loading)
              ? <Loader />
              : ( */}
                <button
                  type="submit"
                  disabled={isFetching}
                //   onClick={e => setLoading(true)}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              {/* )} */}
          
            </form>

            

             
          </div>
  )
}

export default SendEth