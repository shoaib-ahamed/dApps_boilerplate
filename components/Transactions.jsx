import React, { useEffect, useState } from 'react';
import { SiEthereum } from "react-icons/si";
import { useMoralisWeb3Api } from 'react-moralis';

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


  if(transactions){
    return (
      <div>
        {transactions && transactions.map(transaction => 
          <div className="text-[8px] md:text-[12px] lg:text-[16px]" key={transaction.hash}>
            <a  href={`${baseUrl}${transaction.hash}`} rel="noopener noreferrer" target="_blank"> 
              <div className="flex items-center hover:text-blue-300">
                <SiEthereum fontSize={15} color="fff"/> 
                {transaction.hash}
              </div>
            </a>
          </div>
        )}
      </div>
    )
  }

  
}

export default Transactions