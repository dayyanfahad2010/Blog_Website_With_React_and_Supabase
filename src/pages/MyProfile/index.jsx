import React from 'react'
import { UserAuth } from '../../features/auth/AuthContext'
import Header from '../../components/Layout/Header/header';
import MyPosts from '../../features/posts/MyPosts/MyPosts';
import './MyProfile.css'
import contact from '../../assets/contact.png'
const MyProfile = () => {
    const {session}=UserAuth();
    const user_name=session.user.identities[0].identity_data.display_name
    
  return (
    <>
    <Header/>
     <div className="profile-header">
      <div className="cover">
        <img src="https://marketplace.canva.com/EAGdjyGYUoI/1/0/1600w/canva-blue-white-aesthetic-welcome-to-my-profile-twitter-header-PD13zLel5WY.jpg" alt="cover" />
      </div>

      <div className="profile-info">
        <img className="avatar" src={contact} alt="profile" />

        <div className="details">
          <h2>{user_name}</h2>
          <p>Advisor and Consultant at Stripe Inc.</p>

          <div className="stats">
            <span>📍 San Francisco, USA</span>
            <span>500+ connections</span>
          </div>
        </div>
      </div>

    </div>
    <MyPosts/> 
  </>  
  )
}

export default MyProfile