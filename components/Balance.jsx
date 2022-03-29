import { Moralis } from 'moralis'
import React, { useEffect, useState } from 'react'
import { useERC20Balances, useMoralisWeb3Api } from 'react-moralis'

const Balance = ({user}) => {
    console.log(user.get('ethAddress'))

    const Web3Api = useMoralisWeb3Api()
    const {fetchERC20Balances , data} = useERC20Balances()


    const [ethBalance, setEthbalance] = useState(0)

    const fetchNativeBalance = async () => {
        const result = await Web3Api.account.getNativeBalance({
            chain :'ropsten', address: user.get('ethAddress')
        }).catch(e => console.error(e)) 


        if(result.balance){
            setEthbalance(Moralis.Units.FromWei(result.balance))
        }
    }

    useEffect(() => {
        fetchNativeBalance()
        fetchERC20Balances({
            params: {
                chain: 'ropsten',
                address: user.get('ethAddress') 
            }
        })
    }, [])

  return (
    <div>
        <p>Balance:</p>  
        <p>{ethBalance} ETH</p>
    </div>
  )
}

export default Balance