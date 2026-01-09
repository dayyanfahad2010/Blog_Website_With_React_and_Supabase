import React, { useState } from 'react'
import {UserAuth} from './AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import './auth.css'
import ErrorMeassage from '../../components/ErrorMessage/index'
import { Bounce, toast } from 'react-toastify'
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
        <h1 className='create-acc-heading'>Create An Account</h1>
        <div className='form-wrapper'>
            <h3 className='title'>Welcome to NEXA</h3>
            <div className='form-lower-div'>
                    <input type="text" className='single-field' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="email" className='single-field' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" className='single-field' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={handleSignUp} className='submit-btn'>SignUp</button>
                <ErrorMeassage errorMessage={error}/>                
                    <h6 className='login_link'>Already have an account <Link to='/login' style={{color:"#dc4734",textDecoration:'none'}}>SignIn</Link></h6>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup