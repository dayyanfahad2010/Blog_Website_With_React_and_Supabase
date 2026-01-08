import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from'../../assets/logo.png'
import './header.css'
import { UserAuth } from '../../auth/Context'
const Header = () => {
  const [nav,setNav]=useState('')
  const {sesison ,signOut}=UserAuth();
  const navigate=useNavigate();
 const handleLogOut =async ()=>{
        const result=await signOut()
        if(result.success){
          console.log(result);
          navigate('/login')
        }
      }

      const ShowMenu=()=>{
        console.log(nav);
        
        // nav.classList.add('showMenu')
      }
  return (
    <div className='main '>
      <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid ">
            <Link className="navbar-brand logo me-5" to={'/'}> <img src={logo} alt="" /></Link>
            <button className="navbar-toggler ms-5 " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ms-5 ps-5" id="navbarSupportedContent">
              <ul className="navbar-nav ms-5 mb-2 ps-5 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link active " aria-current="page" to={'/'}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/'}>About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/myprofile'}>My_Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/contact'}>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Header