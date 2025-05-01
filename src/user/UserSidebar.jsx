import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiAccountCircleFill } from "react-icons/ri";
import { ImFilePicture } from "react-icons/im";
import { GiRamProfile } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

const UserSidebar = () => {
  return (
    <div className='h-[100%] w-[20%] bg-slate-500 px-4 py-8 shrink-0'><ul>
        <li>
        
          <NavLink to="/user-profile"
          end
          className= {(obj)=>{
              let{isActive}=obj;
              return `py-2 w-[100%]  hover:bg-slate-800 px-4 rounded-lg font-semibold flex items-center gap-2 ${isActive && "bg-cyan-500"}`}}  >
          <span><RiAccountCircleFill /></span><span>My Account</span></NavLink>
          <br></br>
            <NavLink to="/user-profile/update-picture" end
          className= {(obj)=>{
              let{isActive}=obj;
              return `py-2 w-[100%]  hover:bg-slate-800 px-4 rounded-lg font-semibold flex items-center gap-2 ${isActive && "bg-cyan-500"}`}}>
            <span><ImFilePicture /></span> <span>Update Picture </span></NavLink>
            <br></br>
            <NavLink to="update-profile" end
          className= {(obj)=>{
              let{isActive}=obj;
              return `py-2 w-[100%]  hover:bg-slate-800 px-4 rounded-lg font-semibold flex items-center gap-2 ${isActive && "bg-cyan-500"}`}}>
             <span><GiRamProfile /></span> <span>Update Profile</span></NavLink>
            <br></br>
            <NavLink to="update-password" end
          className= {(obj)=>{
              let{isActive}=obj;
              return `py-2 w-[100%]  hover:bg-slate-800 px-4 rounded-lg font-semibold flex items-center gap-2 ${isActive && "bg-cyan-500"}`}}>
              <span><RiLockPasswordFill /></span><span>Update Password</span></NavLink>
            <br></br>
            <NavLink to="/user-profile/delete-user" end
          className= {(obj)=>{
              let{isActive}=obj;
              return `py-2 w-[100%]  hover:bg-slate-800 px-4 rounded-lg font-semibold flex items-center gap-2 ${isActive && "bg-red-500"}`}}>
              <span><MdDeleteForever /></span><span>Delete User</span></NavLink>
            </li>

            
            </ul></div>
  )
}

export default UserSidebar