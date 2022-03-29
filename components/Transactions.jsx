import Link from 'next/link'
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

  console.log(transactions)

  useEffect(() => {
    fetchTransactions()
  }, []) 

  if(transactions){
    return (
      <div>
        {transactions && transactions.map((transaction , i) => {
          <div key={transaction.hash}>
            {i}.  <Link href={`${baseUrl}${transaction.hash}`}> {transaction.hash}</Link>
          </div>
        })}

        {/* {transactions[0].hash} */}
      </div>
    )
  }

  
}

export default Transactions