import { createContext, useContext, useEffect, useState } from "react"
import { __DB } from "../backend/FirebaseConfig"
import { AuthContextAPI } from "./AuthContext"
import { onSnapshot } from "firebase/firestore"
import {doc } from 'firebase/firestore';

 export let userContextApi=createContext()

let UserProvider=(props)=>{
    let{authUser} =useContext(AuthContextAPI)
    let [userProfile,setUserProfile]=useState(null)
    let[isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        let fetchProfile=()=>{
          let user_collection=  doc(__DB,"user_profile",authUser?.uid)
            onSnapshot(user_collection,(data)=>{
                // console.log(data.data());
                 setUserProfile(data.data())
                 
            })
        }
        if(authUser){
          fetchProfile()
    }
    setIsLoading(false)
    },[authUser])

return <userContextApi.Provider value={{userProfile,isLoading}}>

    {props.children}
</userContextApi.Provider>
}
export default UserProvider