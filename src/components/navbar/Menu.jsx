import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContextAPI } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { signOut } from 'firebase/auth'
import { __Auth } from '../../backend/FirebaseConfig'
import { userContextApi } from '../../context/UserContext'
import Spinner from '../../helpers/Spinner'



const Menu = () => {
 let{authUser}= useContext(AuthContextAPI)
 let{userProfile,isLoading}=useContext(userContextApi)
 let navigate=useNavigate()

 

 const logout=async()=>{
  try {
    await signOut(__Auth)
    toast.success("Logged out")
    navigate("/auth/login")
    
  } catch (error) {
    toast.error(error.message)
    
  }
 }
  return (
    <aside>
        <ul className='flex gap-5 items-center'>
        {userProfile?.role==="admin" && authUser &&
        (<li ><NavLink to="/admin" className={(obj)=>{
              let{isActive}=obj;
              return `hover:bg-cyan-800 py-2 px-4 rounded-lg cursor-pointer ${isActive && "bg-cyan-500"}`
            }}>Admin</NavLink></li>)}
            <li ><NavLink to="/" className={(obj)=>{
              let{isActive}=obj;
              return `hover:bg-cyan-800 py-2 px-4 rounded-lg cursor-pointer ${isActive && "bg-cyan-500"}`
            }}>Home</NavLink></li>
           {authUser?<>  
           <li><button className='py-2 px-4 rounded-lg cursor-pointer  hover:bg-cyan-500'onClick={logout}>logout</button></li>
           <li>
            <NavLink to="/user-profile">
              <img src={authUser.photoURL}  alt="" className='h-[30px] w-[30px] rounded-full'/>
            </NavLink></li>
            </>
           :<> <li ><NavLink to="auth/login"className={(obj)=>{
            let{isActive}=obj;
            return `hover:bg-green-800 py-2 px-4 rounded-lg cursor-pointer ${isActive && "bg-green-500"}`
          }}>Login</NavLink></li>
          <li ><NavLink to="auth/register"className={(obj)=>{
            let{isActive}=obj;
            return `hover:bg-green-800 py-2 px-4 rounded-lg cursor-pointer ${isActive && "bg-green-500"}`
          }}>Register</NavLink></li>
          </>}
        </ul>
        {isLoading && <Spinner/>}
    </aside>
  )
}

export default Menu