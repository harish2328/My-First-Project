import React, { useContext } from 'react'
import { AlbumContextAPI } from '../../context/AlbumContext'
import Spinner from '../../helpers/Spinner';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    let {album,isLoading}=useContext(AlbumContextAPI)
    console.log(album);
    
  return (
    <div className='p-8 w-[80%]'>
        <h2 className='text-3xl font-semibold'>Albums</h2>
        <section className='flex gap-3 rounded-lg overflow-x-auto mt-4 scrollbar-hide'>

            {album.map((album)=>{
                return <NavLink to="album-details" state={{album}} key={album.albumId} className='p-4 bg-slate-500 text-center mt-2 rounded-lg shrink-0 '>
                    <img src={album.albumPoster}  className=' mt-2  w-[170px] h-[200px]' alt=""/>
                    <h3>{album.albumTitle}</h3>
                </NavLink>
            })}
        {isLoading && <Spinner/>}
        </section>
    </div>
  )
}

export default Dashboard