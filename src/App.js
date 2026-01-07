import React from 'react'
import { createClient } from "@supabase/supabase-js";
import { AuthProvider } from './components/auth/Context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import ProtectedRoutes from './services/ProtectedRoutes';
import MyPosts from './components/pages/MyPosts';
import MyProfile from './components/pages/MyProfile';

export const supabase = createClient("https://kffegfmdjhkzxdxtmqux.supabase.co", "sb_publishable_hQM2ADpUNT1cC22djBVlaA_y2Q5ToEF",
  {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
}
);
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />} >
            <Route path='/' element={<Home/>}/>
          
          </Route>
            <Route path='/myposts' element={<MyPosts/>}/>
            <Route path='/myprofile' element={<MyProfile/>}/>
          
          {/* </Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App