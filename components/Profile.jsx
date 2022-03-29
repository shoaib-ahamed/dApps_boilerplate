import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'

const Profile = ({user}) => {
   const [userName , setUserName] = useState('')

   console.log(user)

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
    <div>
        <div>
        <p className="text-dark font-semibold text-sm mt-1">Username : {user.getUsername()} </p>
        <p className="text-dark font-semibold text-sm mt-1">Address : {user.get('ethAddress')} </p>
        </div>
        <div>
            <form onSubmit={handleSubmit} className="grid justify-between align-middle mt-2">
                <div className="form-group flex justify-between items-center w-max">
                    <p>Set a username : </p>  
                    <input type="text" className="form-control border-2 w-15 rounded-md p-2 m-3" name="username" value={userName} placeholder="ex. themonstarcar" onChange={handleChangeInput}></input>
                </div>
                <button className="bg-black text-white text-sm rounded font-light h-10 w-25 mt-2" type="submit" disabled={isUserUpdating}>Change Username</button>
            </form>
        </div>
    </div>
  )
}

export default Profile