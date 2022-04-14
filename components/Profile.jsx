import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'

const Profile = ({user}) => {
   const [userName , setUserName] = useState('')

   const {setUserData , isUserUpdating} = useMoralis()

   const handleChangeInput = (e) => {
       const username = e.target.value
       setUserName(username)
        console.log(userName)
   }

   const handleSubmit = (e) => {
    e.preventDefault()
    if(userName.trim() !== '') {
        setUserData({username : userName}).then(() => {setUserName('')})
    }
   }

  return (
    <div className="w-full">
        <div>
            <p className="text-dark font-bold text-sm mt-1">Username : {user.getUsername()} </p>
            <p className="text-dark font-semibold text-[8px] md:text-[12px] lg:text-[16px] mt-1">Address : {user.get('ethAddress')} </p>
        </div>
        <div>
            <form onSubmit={handleSubmit} className="grid justify-between mt-2">
                <div className="form-group grid justify-between items-center w-max">
                    <p>Set a username : </p>  
                    <input type="text" className="form-control border-2 w-15 rounded-md p-2 m-3" name="username" value={userName} placeholder="ex. themonstarcar" onChange={handleChangeInput}></input>
                    <button className="bg-black text-white text-sm rounded font-light h-10 w-25 mt-2" type="submit" disabled={isUserUpdating}>Change Username</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Profile