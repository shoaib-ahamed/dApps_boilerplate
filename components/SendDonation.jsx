import React, { useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';

const inputBox = `className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism`

const SendDonation = () => {

    const { Moralis } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction()

    const [amount , setAmount] = useState();

     const donation = async () => {
        let options = {
            contractAddress:'0x45C022215cea04F49b68c0716AFD7B5f9ee2f876',
            functionName: 'newDonation',
            abi: [{"inputs":[{"internalType":"string","name":"note","type":"string"}],"name":"newDonation","outputs":[],"stateMutability":"payable","type":"function"}], 
            params: {
                note: 'Thanks for your note..!'
            },
            msgValue: Moralis.Units.ETH(amount)
        }

        await Moralis.enableWeb3()
        
        await contractProcessor.fetch({
            onComplete: () =>{
                console.log('complete donation')
                setAmount(0)
            },
            onError: (error) => {
                console.log(error)
            },
            params: options
        })
        
    }

  return (
    <div>

        <form className="mx-auto my-4">
            <div className="form-group">
                <label className="text-white">Amount</label>
                <input className={inputBox} type="amount" name="amount" value={amount} onChange={e=> {setAmount(e.target.value)}} />
            </div>

            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <button
                onClick={donation}
                type='button'
                className="text-white w-full mt-2 border-[1px] p-4 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
                Send Donation
            </button>
        </form>
    </div>
  )
}

export default SendDonation