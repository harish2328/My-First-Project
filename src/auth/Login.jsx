import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { __Auth } from '../backend/FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../helpers/Spinner';
import { AuthContextAPI } from '../context/AuthContext';

const Login = () => {
  let[togglepassword,setTogglePassword]=useState(false)
   let [isLoading,setIsLoading]=useState(false)
  let [data,setData]=useState({
    email:"",
    password:""
  })
  let {email,password}=data;
  let navigate=useNavigate()
  let{setAuthUser}=useContext(AuthContextAPI)

  let handleChange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setData({...data,[key]:value})
  }

 let  handleSubmit =async (e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
     let obj= await signInWithEmailAndPassword(__Auth,email,password)
     let{user}=obj;
     console.log(user)
     if(user.emailVerified===true){
      toast.success("Login Successful")
      setAuthUser(user)
      navigate("/")
     }else{
      toast.error("Verify your email")
      sendEmailVerification(user)
     
     }
     
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-600 flex justify-center items-center'>
            <div className='w-[30%] bg-slate-500 px-2 py-3 rounded-lg'>
                <header>
                    <h1 className='text-center text-3xl'>Login</h1>
                </header>
                <main>
                    <form className='flex flex-col gap-3'onSubmit={handleSubmit}>
                        
                        <div>
                        <label htmlFor='' className='block text-lg'>Email:</label>
                        <input type='email' className='outline-none border-2 w-[100%] my-1 rounded-md pl-2'placeholder='Enter mailid' onChange={handleChange} name='email' value={email}></input>
                        </div>
                        
                        <div className='relative'>
                        <label htmlFor=''className='block text-lg'>Password:</label>
                        <input type={togglepassword ? "text" : "password"} className='outline-none border-2 w-[100%] my-1 rounded-md pl-2' placeholder='Enter Password' onChange={handleChange} name='password' value={password}></input>
                        {togglepassword ?(
                        <FaEye className='absolute top-9.5 right-2 cursor-pointer'
                        onClick={()=>setTogglePassword(!togglepassword)} />
                        ):(<FaEyeSlash className='absolute top-9.5 right-2 cursor-pointer'
                            onClick={()=>setTogglePassword(!togglepassword)} />)
                        }
                        </div>
                        <div>
                            <button className="py-2 bg-cyan-400 w-[100%] rounded-lg cursor-pointer">Login</button>
                        </div>
                        <div className='mt-2 text-center'>
                            <span>Dont have an account ? </span>
                            <NavLink to="/auth/register" className="text-red-500">Register</NavLink>
                        </div>
                        <div className='mt-2 text-center'>
                            <NavLink to="/auth/forget-password" className="text-red-500">ForgotPassword</NavLink>
                        </div>
                    </form>
                </main>
    
            </div>
            <div>
              {isLoading && <Spinner/>}
            </div>
        </section>
  )
}

export default Login