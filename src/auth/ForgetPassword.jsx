import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Spinner from '../helpers/Spinner'
import { sendPasswordResetEmail } from 'firebase/auth'
import { __Auth } from '../backend/FirebaseConfig'
import toast from 'react-hot-toast'


const ForgetPassword = () => {
    let [isLoading,setIsLoading]=useState(false)
    let[email,setEmail]=useState("")
    let navigate=useNavigate()

    let handleChange=(e)=>{
        setEmail(e.target.value)
    }
   let handleSubmit= async (e)=>{
     e.preventDefault()
     setIsLoading(false)
     try{
      await  sendPasswordResetEmail(__Auth,email)
      toast.success("Reset Link sent to email")
      navigate("/auth/login")

     }catch (error){
        toast.success(error.message)

     }
    }
  return (
    <section className='h-[calc(100vh-70px)] w-[100%] bg-slate-600 flex justify-center items-center'>
                <div className='w-[30%] bg-slate-500 px-2 py-3 rounded-lg'>
                    <header>
                        <h1 className='text-center text-3xl'>Reset</h1>
                    </header>
                    <main>
                        <form className='flex flex-col gap-3'onSubmit={handleSubmit}>
                            
                            <div>
                            <label htmlFor='' className='block text-lg'>Email:</label>
                            <input type='email' className='outline-none border-2 w-[100%] my-1 rounded-md pl-2'placeholder='Enter mailid' onChange={handleChange} name='email' value={email}></input>
                            </div>
                            
                            <div>
                                <button className="py-2 bg-cyan-400 w-[100%] rounded-lg cursor-pointer">Reset Password</button>
                            </div>
                            <div className='mt-2 text-center'>
                                <NavLink to="/auth/login" className="text-red-500 block bg-cyan-400 w-[100%] py-2 rounded-lg">Cancel</NavLink>
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

export default ForgetPassword