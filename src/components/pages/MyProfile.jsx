import React from 'react'
import { UserAuth } from '../auth/Context'
import Header from '../layout/header/header';

const MyProfile = () => {
    const {session}=UserAuth();
    console.log(session);
    
  return (
    <>
        <Header/>
    <div style={{textAlign:'center',margin:'100px auto',fontFamily:'serif',fontWeight:700}}>
        <h1 style={{margin:'10px auto',fontSize:'50px'}}>My Profile</h1>
        <h2 style={{margin:'5px auto'}}>{session.user.identities[0].identity_data.display_name}</h2>
        <h4 style={{margin:'5px auto'}}>{session.user.identities[0].identity_data.email}</h4>
        <button style={{padding:'13px 20px ',borderRadius:'20px',margin:'20px auto'}}>Edit Profile</button>
    </div>
    
    </>
  )
}

export default MyProfile