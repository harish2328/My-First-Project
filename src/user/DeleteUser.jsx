import { deleteUser } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContextAPI } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { __DB } from '../backend/FirebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'

const DeleteUser = () => {
    let [text,setText]=useState("")
    let {authUser}=useContext(AuthContextAPI)
    let navigate=useNavigate()

    let handleChange=(e)=>{
        setText(e.target.value)
    }
    let handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            if(text.toLowerCase().trim() ==="delete account"){
                let user_collection=doc(__DB,"user_profile",authUser?.uid)
                await deleteUser(authUser)
                await deleteDoc(user_collection)
                toast.success("Account Deleted")
                navigate("/auth/register")
            }

        } catch (error) {
           toast.error(error.message) 
        }
    }
  return (
    <section className='h-[100%] w-[100%] flex items-center justify-center'>
      <article className='min-h-[400px] w-[40%] bg-slate-800 rounded-xl p-4'>
        <h2 className='text-center text-2xl'>Delete Account</h2>
        <form action="" className='mt-6 flex flex-col gap-6' onSubmit={handleSubmit}>
        <div>
            <h3>Are you sure you want to Delete the account</h3>
            <h3>If yes,Enter Delete Account</h3>
        </div>
        <input type="text " placeholder='Delete Account ' className='outline-none bg-white py-2 px-4 rounded-lg text-black w-[100%]' onChange={handleChange} value={text}/>
        <button className='bg-red-700 px-4 py-2 rounded-lg cursor-pointer'>Delete Account</button>
        </form>
      </article>
    </section>
  )
}

export default DeleteUser