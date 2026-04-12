import { useEffect } from 'react'
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
<<<<<<< HEAD
import logo from '../../assets/unnamed.jpg'
import { Link } from 'react-router-dom';
=======
import logo from '../../assets/logo2.0.jpeg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
>>>>>>> 2c5b40f (Added About)

const Header = () => {

  const { dark, setDark } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to #about when hash changes
  useEffect(() => {
    if (location.hash === '#about') {
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleAboutClick = () => {
    if (location.pathname === '/') {
      // Already on home page, just scroll
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash
      navigate('/#about');
    }
  };

  console.log(dark);
  return (
    <div className='h-16 w-full text-var(--navbar-color) font-bold flex items-center justify-between  space-x-4 border-b-2 ' style={{ background: 'var(--navbar-bg' }}>
      <div className="logo ml-5 ">
        <Link to="/">
          <img 
            src={logo} 
            height={60} 
            width={60} 
            className='rounded-[25px] cursor-pointer' 
          />
        </Link>
        {/* <img src={logo} height={50} width={60} className='rounded-[25px]' />*/}
      </div> 

      {/* //header */}
      

      <div className="flex mr-5 space-x-4">
        <Link to="/">
        <div className="home cursor-pointer hover:text-red-500">
          Home
        </div>
      </Link>
        <Link to="/favour">
          <div className="add cursor-pointer hover:text-red-500">
            Wishlist
          </div>
        </Link>
<<<<<<< HEAD
        <div className="about cursor-pointer hover:text-red-500">About</div>
        {/* <div className="mode cursor-pointer  hover:text-red-500">
=======
        <div className="about cursor-pointer hover:text-red-500" onClick={handleAboutClick}>About</div>
        <div className="mode cursor-pointer  hover:text-red-500">
>>>>>>> 2c5b40f (Added About)
          {dark ? <span onClick={() => setDark(false)}>Light</span> : <span onClick={() => setDark(true)}>Dark</span>}
        </div> */}
        <div 
          className="mode cursor-pointer hover:text-red-500"
          onClick={() => setDark(!dark)} >
          Theme
        </div>
        <div className="login cursor-pointer  hover:text-red-500">Logout</div>
        {/* <div className="div cursor-pointer hover:text-red-500">SignUp</div> */}
      </div>
        
    </div>

  )
}

export default Header