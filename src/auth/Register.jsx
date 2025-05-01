import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { __Auth } from '../backend/FirebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../helpers/Spinner';


const Register = () => {
    let[togglepassword,setTogglePassword]=useState(false)
    let[toggleconfirmpassword,setToggleConfirmPassword]=useState(false)
    let navigate=useNavigate()
    let [isLoading,setIsLoading]=useState(false)

    let [data,setData]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    let{username,email,password,confirmPassword}=data;

    let handleChange=(e)=>{
        let value=e.target.value
        let key=e.target.name
        setData({...data,[key]:value})
    }

    let handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            setIsLoading(true)

            if(password !== confirmPassword){
                toast.error("Confirm Password does not match")
                setData({...data,confirmPassword:""})
            }
            else{
             let obj= await createUserWithEmailAndPassword(__Auth,email,password)
             let {user}=obj;
             console.log(user);
            await updateProfile(user,{
                displayName:username,
                photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
            })
            sendEmailVerification(user)
            toast("Verification link sent")
            toast.success("User registered")
            navigate("/auth/login")
             
            }

        } catch(error){
            console.log(error.message);
            toast.error(error.message.slice(22,error.message.length-2))
            

        }
        finally{
            setIsLoading(false)


        }
        
    }
  return (
    <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-600 flex justify-center items-center'>
        <div className='w-[30%] bg-slate-500 px-2 py-3 rounded-lg'>
            <header>
                <h1 className='text-center text-3xl'>Register</h1>
            </header>
            <main>
                <form className='flex flex-col gap-3'onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor='' className='block text-lg'>Username:</label>
                    <input type='text' className='outline-none border-2 w-[100%] my-1 rounded-md pl-2'placeholder='Enterusername' onChange={handleChange} name='username' value={username}></input>
                    </div>
                    
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
                    
                    <div className='relative' >
                    <label htmlFor=''className='block text-lg'>Confirm Password:</label>
                    <input type={toggleconfirmpassword ? "text" : "password"} className='outline-none border-2 w-[100%] my-1 rounded-md pl-2' placeholder='Enter Password' onChange={handleChange} name='confirmPassword' value={confirmPassword}></input>
                    {toggleconfirmpassword ?(
                    <FaEye className='absolute top-9.5 right-2 cursor-pointer'
                    onClick={()=>setToggleConfirmPassword(!toggleconfirmpassword)} />
                    ):(<FaEyeSlash className='absolute top-9.5 right-2 cursor-pointer'
                        onClick={()=>setToggleConfirmPassword(!toggleconfirmpassword)} />)
                    }
                    </div>
                    <div>
                        <button className="py-2 bg-cyan-400 w-[100%] rounded-lg cursor-pointer">Register</button>
                    </div>
                    <div className='mt-2 text-center'>
                        <span>Already have an account ? </span>
                        <NavLink to="/auth/login" className="text-red-500">Login</NavLink>
                    </div>
                </form>
            </main>

        </div>
        {isLoading && <Spinner/>}
    </section>
  )
}

export default Register