import React from 'react'
import { createClient } from "@supabase/supabase-js";
import { AuthProvider } from './components/auth/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import ProtectedRoutes from './services/ProtectedRoutes';

export const supabase = createClient("https://kffegfmdjhkzxdxtmqux.supabase.co", "sb_publishable_hQM2ADpUNT1cC22djBVlaA_y2Q5ToEF");
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />} >
            <Route path='/' element={<Home/>}/>
          
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App