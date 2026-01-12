import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../features/auth/AuthContext'
import Header from '../../components/Layout/Header/header.jsx';
import MyPosts from '../../features/posts/MyPosts/MyPosts';
import './MyProfile.css'
import contact from '../../assets/contact.png'
import { supabase } from '../../App.js';
import Model from '../../components/model/Model.jsx';
const MyProfile = () => {
    const {session}=UserAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const loadProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

        setLoading(true)
        setProfile(data);
      };
      
      loadProfile();
    }, []);

    const User =()=>{
      if(profile.user_pic===null){
        console.log(profile);
        
        return <img src={contact} alt="Imag" className='avatar'/>
      }
      else{
        console.log(profile);
        
        return <img src={profile.user_pic} alt="Ima" className='avatar'/>
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
                <h2>{profile.user_name}</h2>
                <p>{profile.bio}</p>

                <div className="stats">
                  <span>{profile.location}</span>
                  <span>{profile.connections}connections</span>
                  
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                      Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        <MyPosts/>
      </>
        ) 
      }
      else{
        return <p>Loading...</p>
      }
    } 

  return (
    <>
    <Header/>
    <UserImg/>
     {showModal && <Model data={profile}close={() => setShowModal(false)} />}
  </>  
  )
}

export default MyProfile