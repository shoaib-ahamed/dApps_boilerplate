import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { HiMenuAlt4 } from 'react-icons/hi'
import { useMoralis } from 'react-moralis'


const NavItem = ({classProps , title}) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}> {title} </li> 
  )
}

const Navbar = () => {
  const [toggleMenu , setToggleMenu] = useState(false)

  const { isAuthenticated , authenticate , user , logout} = useMoralis()

  const connectWallet = (e) => {
    e.preventDefault();
    authenticate({})
  }

  const disconnectWallet = (e) => {
    e.preventDefault();
    logout()
  }

  return (
    <nav className="flex justify-end items-center w-screen p-10">
      <div className="flex justify-center items-center">
        {/* <Image src="/logo.png" alt="logo" width="150" height="50"/> */}
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center">
        {["Market", "Exchange", "Wallets"].map((item, index) => (
          <NavItem key={item + index} title={item} />
        ))}
        {(isAuthenticated) ?
        <>
        <button onClick={disconnectWallet}>
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
        Logout
      </li>
      </button> 
      </>
        : 
        <button onClick={connectWallet}>
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
        Login
      </li>
      </button> 
        }
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <div className="display-flex justify-between">
              
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
              {["Market", "Exchange", "Tutorials", "Wallets"].map(
                (item, index) => <NavItem key={item + index} title={item} classprops="my-2 text-lg" />,
              )}
              {(isAuthenticated) ?
      <>
        <button onClick={disconnectWallet}>
          <li className="bg-[#2952e3] mt-5 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Logout
          </li>
        </button> 
      </>
        : 
      <button onClick={connectWallet}>
        <li className="bg-[#2952e3] mt-5 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
        Login
        </li>
      </button> 
        }
            </ul>
            </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar