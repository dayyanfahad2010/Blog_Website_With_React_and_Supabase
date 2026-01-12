import React, { useEffect, useState } from 'react'
import Header from '../../components/Layout/Header/header.jsx';
import MyPosts from '../../features/posts/MyPosts/MyPosts';
import { supabase } from '../../App.js';
import ProfileCart from '../../features/profilecart/ProfileCart.jsx';
import Model from '../../components/model/Model.jsx';
const MyProfile = () => {
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

    const UserImg=()=>{
      if(loading){
        return <ProfileCart profile={profile}/>
      }
      else{
        return <p>Loading...</p>
      }
    }
    
    return (
      <>
      <Header/>
      <UserImg/>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Edit Profile
      </button>
      {showModal && <Model data={profile}close={() => setShowModal(false)} />}
      <MyPosts/>
  </>  
  )
}

export default MyProfile