import React from 'react'
import { createClient } from "@supabase/supabase-js";
import { AuthProvider } from './features/auth/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/index';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import ProtectedRoutes from './features/routes/ProtectedRoutes';
import MyPosts from './features/posts/MyPosts/MyPosts';
import MyProfile from './pages/MyProfile/index';
import { ToastContainer } from 'react-toastify';
import SinglePost from './features/posts/SinglePost/SinglePost';


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
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
    
  )
}

export default App