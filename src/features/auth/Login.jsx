import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import './auth.css'
import ErrorMeassage from '../../components/ErrorMessage/index';
import { Bounce, toast } from 'react-toastify';

const Login = () => {
   const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState("");
    const [err, setError] = useState("");
    const {session,error,signIn}=UserAuth();
    const navigate =useNavigate();
    console.log(session);
    
    const handleSignIn = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signIn(email,password);
            if(result.success){
               toast.success("User Successfully SignUp",{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
              })
                navigate('/')
            }
        }catch(err){
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
      <div className="form-wrapper">
        <h3 className='title'>Login</h3>
        <div className="form-lower-div">
          <input type="email" placeholder='Email' className='single-field' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' className='single-field' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button onClick={handleSignIn} className='submit-btn'>SignIn</button>
        <ErrorMeassage errorMessage={error}/>  
          <h6 className='login_link'>Don't have an account <Link to='/signup' style={{color:"#dc4734",textDecoration:'none'}}>SignUp</Link></h6>
        </div>

      </div>
    </div>
    </>
  )
}

export default Login