import { useEffect } from 'react'
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import logo from '../../assets/logo2.0.jpeg'
import { Link } from 'react-router-dom';

const Header = () => {

  const { dark, setDark } = useContext(ThemeContext);

  console.log(dark);
  return (
    <div className='h-16 w-full text-var(--navbar-color) font-bold flex items-center justify-between  space-x-4 border-b-2 ' style={{ background: 'var(--navbar-bg' }}>
      <div className="logo ml-5 ">
        <img src={logo} height={50} width={60} className='rounded-[25px]' />
      </div>

      {/* //header */}
      <div className="flex mr-5 space-x-4">
        <Link to="/favour">
          <div className="add cursor-pointer hover:text-red-500">
            Wishlist
          </div>
        </Link>
        <div className="about cursor-pointer hover:text-red-500">About</div>
        <div className="mode cursor-pointer  hover:text-red-500">
          {dark ? <span onClick={() => setDark(false)}>Light</span> : <span onClick={() => setDark(true)}>Dark</span>}
        </div>
        <div className="login cursor-pointer  hover:text-red-500">Login</div>
        <div className="div cursor-pointer hover:text-red-500">SignUp</div>
      </div>
        
    </div>

  )
}

export default Header