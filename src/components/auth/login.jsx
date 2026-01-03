import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const Login = () => {
   const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState("");
    const {session,signIn}=UserAuth();
    const navigate =useNavigate();
    console.log(session);
    
    const handleSignIn = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signIn(email,password);
            if(result.success){
                navigate('/')
            }
        }catch(err){
            console.log('SignIn',err)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div>
        <h1>Login</h1>
        <p>Don't have an account <Link to='/signup'>SignUp</Link></p>
      <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSignIn}>SignIn</button>
    </div>
  )
}

export default Login