import React from 'react'
import { MdDashboardCustomize, MdPhotoAlbum } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='h-[calc(100vh-70px)] sticky top-[70px]  w-[20%] bg-slate-500 px-4 py-8 shrink-0'><ul>
        <li>
        
          <NavLink to="/"
          end
          className= {(obj)=>{
              let{isActive}=obj;
              return `py-2 w-[100%]  hover:bg-slate-800 px-4 rounded-lg font-semibold flex items-center gap-2 ${isActive && "bg-cyan-500"}`}}  >
          <span><MdDashboardCustomize /></span><span> Dashboard</span></NavLink>
          
            
            </li></ul></div>
  )
}

export default Sidebar