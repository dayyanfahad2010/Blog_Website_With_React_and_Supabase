import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from'../../assets/logo.png'
import './header.css'
import { UserAuth } from '../../auth/AuthContext'
const Header = () => {
  const {sesison ,signOut}=UserAuth();
  const navigate=useNavigate();
 const handleLogOut =async ()=>{
        const result=await signOut()
        if(result.success){
          console.log(result);
          navigate('/login')
        }
      }
  return (
    <div className='main'>
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <div className="flex">
            <nav>
                <li><Link to={'/'} className='Links'>Home</Link></li>
                <li><Link to={'/'} className='Links'>About</Link></li>
                <li><Link to={'/myposts'} className='Links'>My_Posts</Link></li>
                <li><Link to={'/myprofile'} className='Links'>My_Profile</Link></li>
                <li><Link to={'/login'} className='Links' onClick={handleLogOut}>LogOut</Link></li>
            </nav>
        </div>
    </div>
  )
}

export default Header