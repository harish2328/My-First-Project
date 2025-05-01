import { updateProfile } from 'firebase/auth'
import React,{useContext,useState} from 'react'
import toast from 'react-hot-toast'
import { AuthContextAPI } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../helpers/Spinner'

const UpdatePicture = () => {
  let [picture,setPicture]=useState(null)
  let[preview,setPreview]=useState(null)
  let {authUser}=useContext(AuthContextAPI)
  let navigate =useNavigate()
  let [isLoading,setIsLoading]= useState(false)
  const handleChange=(e)=>{
    // console.dir(e.target.files[0]);
    let file=e.target.files[0]
    setPicture(file)


    if(file){
      let url=URL.createObjectURL(file)
      console.log(url);   
      setPreview(url)
    }
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setIsLoading(true)
    try {
      if(!picture){
        toast.error("select a photo")
        return;
      }else{
        const data=new FormData()
        data.append("file",picture)
        data.append("upload_preset","Innovators Hub Music")
        let response=await fetch("https://api.cloudinary.com/v1_1/dpfse3vbc/image/upload",
          {method:"POST",
          body:data})

          let result=await response.json()
           console.log(result);

          await updateProfile(authUser,{
            photoURL:result.url 
            
           })
           toast.success("Photo updated")
           navigate("/user-profile")
           
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
         setIsLoading(false)
    }


  }
  return (
    <section className='h-[100%] w-[100%]  flex flex-col justify-center items-center'>
    <article className='min-h-[300px] w-[40%] bg-slate-800 rounded-lg p-4'>
      <h2 className=' text-center'>Upload profile Picture</h2>
      <form onSubmit={handleSubmit} className=' flex flex-col gap-3'>
        <div className='w-32 h-32 m-auto rounded-full bg-gray-500'>
          {preview ?<img src={preview} alt='' className='h-[100%] w-[100%] rounded-full'/>:<div className='h-[100%] w-[100%] rounded-full flex justify-center items-center'>No File Found</div>}
        </div>
      <label htmlFor='picture' className=' block w-[100%] border-1 border-dotted text-center py-2 rounded-lg hover:bg-amber-700' accept="image/*">Select a photo</label>
      <input type='file' id='picture' className='hidden' onChange={handleChange} name="picture/*"></input>
      <button className='block w-[100%] bg-cyan-500 text-center py-1 rounded-lg cursor-pointer hover:bg-cyan-300'>Upload Photo</button>
      </form>
      </article> 
      {isLoading && <Spinner/>}
        </section>
       
        
  )
}

export default UpdatePicture