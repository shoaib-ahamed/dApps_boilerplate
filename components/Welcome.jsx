import React from 'react';
import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { useMoralis } from 'react-moralis';
import SendEth from './SendEth';
import TabLayout from './TabLayout';


const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";





const Welcome = () => {
  const {isAuthenticated , authenticate , user} = useMoralis()

  const connectWallet = (e) => {
    e.preventDefault();
    authenticate({})
  }

  

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="flex md:gap-3 lg:flex-row flex-col items-start justify-between lg:mt-0 md:mt-10 py-12 px-16">

        <div className="flex flex-1 gap-3 justify-start flex-col">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient  py-1 ">Send Crypto <br/> across the world. </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p>
          {(!isAuthenticated) ? <button
          type="button"
          onClick={connectWallet} 
          className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg[#2546bd]" 
          >
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button> : <></>}

          <div >
            {(isAuthenticated)? <TabLayout user={user}/> :
            <>
            <div className={`rounded-t-2xl ${commonStyles}`}>
              Reliability
            </div>
            <div className={commonStyles}>
              Security
            </div>
            <div className={`rounded-b-2xl ${commonStyles}`}>
              Ethereum
            </div>
            </>
            }
            
            
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1 items-center justify-start w-full">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 w-72 md:w-80  my-5 eth-card white-glassmorpism">
            <div className="flex justify-between flex-col w-full h-full">
               <div className="flex justify-between items-start ">
                  <div className="w-10 h-10 rounded-full border-2 border-white hover:border-black flex justify-center items-center">
                    <SiEthereum fontSize={21} className="hover:text-[26px] text-white hover:text-black"/>
                  </div>
                  <BsInfoCircle fontSize={17} color="fff"/>
               </div>
               {(isAuthenticated) ? <div>
               <p className="text-white font-semibold text-sm">Username : {user.getUsername()}</p>
               </div> : <div>
               <p className="text-white font-light text-sm">Address</p>
               <p className="text-white font-semibold text-lg mt-1">Ethereum</p> 
               </div>}
            </div>
          </div>

          <SendEth/>

        </div>
      </div>
    </div>
  )
}

export default Welcome