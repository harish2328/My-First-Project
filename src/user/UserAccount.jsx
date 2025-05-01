import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'
import { userContextApi } from '../context/UserContext'

const UserAccount = () => {
  let {authUser}=useContext(AuthContextAPI)
    let {userProfile}= useContext(userContextApi)
  return (
    <section className='h-[100%] w-[100%]  flex justify-center items-center'>
      <article className='min-h-[300px] w-[40%] bg-slate-800 rounded-lg p-4'>
        <header className='h-[100px] w-[100%] bg-slate-600 rounded-t-xl flex flex-col items-center'>
          <img src={authUser?.photoURL} className='h-28 w-28 rounded-full -mt-16' alt=''/>
          <h2>{authUser?.displayName}</h2>
          <p>{authUser?.email}</p>
        </header>
        {userProfile? <div className='mt-2'>
      <h2 className='text-center text-cyan-600 text-2xl'>Personal Info</h2>
      <article className='flex flex-wrap gap-4 mt-2'> 
        <div className='w-[48%] bg-slate-600 py-2 px-4 rounded-lg'> 
          <h3 className=' text-cyan-700'>Phone Number: </h3>
          <p>{userProfile?.phoneNumber}</p>
        </div>
        <div className='w-[48%] bg-slate-600 py-2 px-4 rounded-lg'>
          <h3 className=' text-cyan-700'>Date Of Birth</h3>
          <p>{userProfile?.dateOfBirth}</p>
        </div>
        <div className='w-[48%]  bg-slate-600 py-2 px-4 rounded-lg'>
          <h3 className=' text-cyan-700'>Languages</h3>
          <p>{userProfile?.languages}</p>
        </div>
        <div  className='w-[48%]  bg-slate-600 py-2 px-4 rounded-lg' >
          <h3 className=' text-cyan-700'>Gender</h3>
          <p>{userProfile?.gender}</p>
        </div>
        <div  className='w-[100%]  bg-slate-600 py-2 px-4 rounded-lg'>
          <h3 className=' text-cyan-700'>address</h3>
          <p>{userProfile?.address}</p>
        </div>
      </article>
    </div>:<>
    <div className='h-[150px] w-[100%] flex items-center justify-center flex-col gap-4'>
      <h2>User does not present</h2>
      <NavLink to="update-profile" className="py-2 px-4 bg-fuchsia-600 rounded-lg">Add user data</NavLink>
    </div>
    </>}
        </article>
    </section>
  )
}

export default UserAccount