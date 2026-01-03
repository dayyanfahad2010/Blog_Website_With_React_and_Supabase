import React, { useState } from 'react'
import {UserAuth} from './AuthContext'
import {Link, useNavigate} from 'react-router-dom'
const Signup = () => {
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState("");
    const {session,signUpAUser}=UserAuth();
    const navigate =useNavigate();
    console.log(session);
    
    const handleSignUp = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signUpAUser(email,password,name);
            if(result.success){
                navigate('/login')
            }
        }catch(err){
            console.log('SignUp',err)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div>
        <h1>SignUp</h1>
        <p>Already have an account <Link to='/login'>SignIn</Link></p>
        <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSignUp}>SignUp</button>
    </div>
  )
}

export default Signup