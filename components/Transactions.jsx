import React, { useEffect, useState } from 'react'
import { useMoralisWeb3Api } from 'react-moralis'

const Transactions = ({user}) => {
  const Web3Api = useMoralisWeb3Api()
  const baseUrl = 'https://rinkeby.etherscan.io/tx/'

  const [transactions, setTransactions] = useState([])

  const fetchTransactions = async () => {
      const data = await Web3Api.account.getTransactions({
        chain :'rinkeby', 
        address: user.get('ethAddress'),
        limit : 5
      }).catch(e => console.error(e)) 
      if(data){
        setTransactions(data.result)
      }
  }

 
  useEffect(() => {
    fetchTransactions()
  }, []) 


  console.log(transactions)

  if(transactions){
    return (
      <div>
        {transactions && transactions.map(transaction => 
          <div className="text-[8px] md:text-md"key={transaction.hash}>
            <a href={`${baseUrl}${transaction.hash}`}>  
              <p >{transaction.hash}</p>
            </a>
          </div>
        )}
        {/* hash : {transactions[0].hash} <br/>
        gas : {transactions[0].gas} */}
      </div>
    )
  }

  
}

export default Transactions