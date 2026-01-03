import React from 'react'
import { UserAuth } from '../components/auth/AuthContext'
import { Navigate,Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const{session}=UserAuth()
    return session? <Outlet/>:<Navigate to={'/login'}/>
}

export default ProtectedRoutes