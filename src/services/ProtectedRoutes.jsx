import React from 'react'
import { UserAuth } from '../components/auth/Context'
import { Navigate,Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const {session}= UserAuth();
    console.log(session );
    function ProtectRoute(){        
        return session!=null? true:false
    }
    
    const h=setInterval(() => {
        const result =ProtectRoute()
        return result != null?true:false

    }, 200);
    return h?<Outlet/>:<Navigate tp='/login'/>
}

export default ProtectedRoutes