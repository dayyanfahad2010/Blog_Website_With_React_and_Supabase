import React from 'react'
import { UserAuth } from '../components/auth/AuthContext'
import { Navigate,Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const {session}= UserAuth();
    console.log(session );
    // console.log(session);
    
    
    const Session=session ?true:false;
    console.log(session);
    
    return session? <Outlet/>:<Navigate to={'/login'}/>
}

export default ProtectedRoutes