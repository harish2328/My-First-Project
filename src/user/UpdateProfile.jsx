import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { __DB } from '../backend/FirebaseConfig';
import {doc,setDoc } from 'firebase/firestore';
import { userContextApi } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../helpers/Spinner';


const UpdateProfile = () => {
  let{authUser}=useContext(AuthContextAPI)
  let {userProfile}=useContext(userContextApi)
  let navigate=useNavigate()
  let [isLoading,setIsLoading]= useState(false)
  let[data,setData]=useState({
    phoneNo:userProfile?.phoneNumber,
    dob:userProfile?.dateOfBirth,
    language:userProfile?.languages,
    gender:userProfile?.gender,
    address:userProfile?.address
  })

  let{phoneNo,dob,language,gender,address}=data;

  let handleChange=(e)=>{
    let key=e.target.name
    let value=e.target.value
    setData ({...data,[key]:value})

  }
  
  

  let handleSubmit= async (e)=>{
    e.preventDefault()
    // console.log(data);
    let{displayName,email,photoURL,uid}=authUser
    let payLoad={
      name:displayName,
      email:email,
      photo:photoURL,
      id:uid,
      phoneNumber:phoneNo,
      dateOfBirth:dob,
      gender:gender,
      languages:language,
      address:address,
      role:"user"
    }
    try {
      setIsLoading(true)
      console.log(payLoad);  
      let user_collection=doc(__DB,"user_profile",uid)
      await setDoc(user_collection,payLoad)
      toast.success("details added")
      navigate("/user-profile")
      
    } catch (error) {
      toast.error(error.message)

    }

    finally{
      setIsLoading(false)
    }
    
  }
  return (
    <section className='h-[100%] w-[100%]  flex justify-center items-center'>
      <article className='min-h-[400px] w-[60%] bg-slate-800 rounded-lg p-4'>
        <h2 className='text-center'>Upload Profile Data</h2>
        <form className='mt-8 flex flex-col gap-3' onSubmit={handleSubmit}>
          <article className='flex gap-5 '>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='phoneNo' className='block text-[18px]'>Phone Number</label>
            <input type='number' id='number' placeholder='Enter phone number ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' onChange={handleChange} name="phoneNo" value={phoneNo} />
          </div>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='' className='block text-[18px]'>Date of birth</label>
            <input type='date' id='dob' placeholder='' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' onChange={handleChange} name="dob" value={dob}/>
          </div>
          </article>
          <article className='flex gap-5 '>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='languages' className='block text-[18px]'>Languages</label>
            <input type='text' id='languages' placeholder='Enter your Language ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' onChange={handleChange} name='language' value={language}/>
          </div>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='' className='block text-[18px]'>Gender</label>
            <div className='flex gap-2 font-semibold text-lg'>
            <input type='radio' onChange={handleChange} name='gender' value="Male" checked={gender==="Male"}/><span>Male</span>
            <input type='radio' onChange={handleChange} name='gender' value="Female" checked={gender==="Female"}/><span>Female</span>
            <input type='radio'onChange={handleChange} name='gender' value="Others" checked={gender==="Others"}/><span>Others</span>
            </div>
          </div>
          </article>
          <article>
            <div className='flex flex-col  gap-2 w-[100%]'>
            <label htmlFor='address'>Address</label>
            <textarea id='address' className='bg-amber-50 outline-none text-black rounded-lg' placeholder='Enter your Address' onChange={handleChange} name='address' value={address}></textarea>
            </div>
          </article>
          <article>
            <button className='py-2 w-[100%] bg-cyan-400 rounded-lg cursor-pointer hover:bg-cyan-700'>Submit</button>
          </article>
        </form>
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default UpdateProfile