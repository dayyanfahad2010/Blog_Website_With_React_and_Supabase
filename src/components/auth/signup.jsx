import React, { useState } from 'react'
import {UserAuth} from './Context'
import {Link, useNavigate} from 'react-router-dom'
import './auth.css'
import ErrorMeassage from '../ErrorMessageShowing'
const Signup = () => {
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState("");
    const [err, setError] = useState("");
    const {session,error,signUpAUser}=UserAuth();
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
            setError(err)
            alert(err)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <>
    <div className='mainDiv'>
        <h1>SignUp</h1>
        <p>Already have an account <Link to='/login'>SignIn</Link></p>
        <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSignUp}>SignUp</button>
        <ErrorMeassage errorMessage={error}/>
    </div>
    </>
  )
}

export default Signup