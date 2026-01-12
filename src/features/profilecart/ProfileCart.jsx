import React, { useState } from 'react'
import contact from '../../assets/contact.png'
import './MyProfile.css'
const ProfileCart = (profile) => {
    const [loading, setLoading] = useState(true);
    
     const User =()=>{
      if(profile.profile.user_pic===null){
        console.log(profile);
        
        return <img src={contact} alt="Imag" className='avatar'/>
      }
      else{
        console.log(profile);
        
        return <img src={profile.profile.user_pic} alt="Ima" className='avatar'/>
      }
    }
    const UserImg=()=>{
      if(loading){
        return (
          <>
          <div className="profile-header">
            <div className="cover">
              <img src="https://marketplace.canva.com/EAGdjyGYUoI/1/0/1600w/canva-blue-white-aesthetic-welcome-to-my-profile-twitter-header-PD13zLel5WY.jpg" alt="cover" />
            </div>

            <div className="profile-info">
              <User/>

              <div className="details">
                <h2>{profile.profile.user_name}</h2>
                <p>{profile.profile.bio}</p>

                <div className="stats">
                  <span>{profile.profile.location}</span>
                  <span>{profile.profile.connections}connections</span>
                  
                    
                </div>
              </div>
            </div>
          </div>
        {/* <MyPosts/> */}
      </>
        ) 
      }
      else{
        return <p>Loading...</p>
      }
    } 
  return (
    <>
    <UserImg/>
    </>
  )
}

export default ProfileCart