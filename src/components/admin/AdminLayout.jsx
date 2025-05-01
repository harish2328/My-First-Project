import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex bg-slate-700 min-h-[calc(100vh-70px)]'>
        <AdminSidebar/>
        <Outlet/>
    </div>
  )
}

export default AdminLayout