import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from'../../../assets/logo.png'
import './header.css'
import { UserAuth } from '../../../features/auth/AuthContext'
import { supabase } from '../../../App'
import ProfileCart from '../../../features/profilecart/ProfileCart'
const Header = () => {
  const {signOut}=UserAuth();
  const [search,setSearch]=useState("")
  const [profile,setProfile]=useState("")
  const navigate=useNavigate();
 const handleLogOut =async ()=>{
        const result=await signOut()
        if(result.success){
          console.log(result);
          navigate('/login')
        }
      }
      const loadProfile = async () => {
        // const { data: { user } } = await supabase.auth.getUser();
        const { data } = await supabase
        .from("profiles")
        .select("*")

        data.map((c)=>{
          if(c.user_name===search){
            setProfile(c.id);
            console.log(c.user_name);
            navigate('/user/:c.id')
          }
        })
      };

  return (
    <>    
    <div className='main '>
      <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid ">
            <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button onClick={loadProfile}>Search</button>
            <Link className="navbar-brand logo me-5" to={'/'}> <img src={logo} alt="" /></Link>
            <button className="navbar-toggler ms-5 " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ms-lg-5 ps-lg-5" id="navbarSupportedContent">
              <ul className="navbar-nav ms-lg-5 mb-2 ps-lg-5 mb-lg-0 ">
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
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'} onClick={handleLogOut}>LogOut</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
    </>
  )
}

export default Header