import React, { useContext } from 'react'
import { userContextApi } from '../context/UserContext'

const AdminRoutes = (props) => {
    let {userProfile}=useContext(userContextApi)
    if(userProfile ?.role === "admin"){
     return props.children
 
    }else{
     return <Navigate to="/"/>
     
    }
}

export default AdminRoutes