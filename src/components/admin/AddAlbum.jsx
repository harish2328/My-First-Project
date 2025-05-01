import React, { useState } from "react";
import Spinner from "../../helpers/Spinner";
import { doc , setDoc } from "firebase/firestore";
import { __DB } from "../../backend/FirebaseConfig";

const AddAlbum = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [album, setAlbum] = useState({
    albumTitle: "",
    albumPoster:null,
    albumReleaseDate: "",
    albumLanguages: "",
    albumDescription: "",
  });
  let {
    albumTitle,
    albumPoster,
    albumReleaseDate,
    albumLanguages,
    albumDescription,
  } = album;
  let handleAlbumChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setAlbum({ ...album, [key]: value });
  };
  let handleAlbumPosterChange = (e) => {
    let file = e.target.files[0];
    setAlbum({ ...album, albumPoster: file });
  };

  let initialSongData = {
    songName: "",
    songFile: null,
    songThumbnail: null,
    songSingers: "",
    songMood: "",
    songDirector: "",
  };
  let [songs, setSongs] = useState([initialSongData]);
  let addSongs = () => {
    setSongs([...songs,{...initialSongData}]);
  };
  let removeSongs = (ind) => {
    let newSongs = songs.filter((value, index) => index !== ind);
    setSongs(newSongs);
  };
  let handleSongChange = (e,index)=>{
    let value = e.target.value
    let key = e.target.name
    let copy = [...songs]
    copy[index][key]=value
    setSongs(copy)
  }
  let handleSongFileChange = (e,index)=>{
    let file = e.target.files[0]
    let key = e.target.name
    let copy = [...songs]
    copy[index][key]=file
    setSongs(copy)
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(album);
    
    try {
      setIsLoading(true)
      let albumPosterData = new FormData()
      albumPosterData.append("file",albumPoster)
      albumPosterData.append("upload_preset","innovators hub music")
      let posterResponse=  await  fetch("https://api.cloudinary.com/v1_1/dh0deuawx/image/upload",{
        method:"POST",
        body:albumPosterData
      })
      let PosterResult = await posterResponse.json()
      let albumId = PosterResult.asset_id;
      let albumPosterURL = PosterResult.url

      let albumData = {
        albumId:albumId,
        albumTitle:albumTitle,
        albumPoster:albumPosterURL,
        albumReleaseDate:albumReleaseDate,
        albumLanguages:albumLanguages,
        albumDescription:albumDescription
      }
      // console.log(albumPosterURL);
      // console.log(albumData);
      console.log(songs);
      let songData = []
      // setIsLoading(true);
      await Promise.all(
      songs.map(async(value,index)=>{
        console.log(value);
        
        let songThumbnailData = new FormData()
        songThumbnailData.append("file",value.songThumbnail)
        songThumbnailData.append("upload_preset","innovators hub music")
        let songThumbnailResponse = await fetch("https://api.cloudinary.com/v1_1/dh0deuawx/image/upload",{
          method:"POST",
          body:songThumbnailData,
        })
        let songThumbnailResult = await songThumbnailResponse.json()
        let songThumbnailURL = songThumbnailResult.url

        let songFileData = new FormData()
        songFileData.append("file",value.songFile)
        songFileData.append("upload_preset","innovators hub music")

        let songFileResponse = await fetch("https://api.cloudinary.com/v1_1/dh0deuawx/upload",{
          method:"POST",
          body:songFileData,
        })
        let songFileResult =await songFileResponse.json()
        // console.log(songFileData);
        let songFileURL = songFileResult.url
        let songFileFormat = songFileResult.format
        let songFileBytes = songFileResult.bytes
        let songFileId = songFileResult.asset_id
        let songFileDuration = songFileResult.duration
        
        // console.log(songFileURL);
        // console.log(songFileFormat);
        // console.log(songFileBytes);
        // console.log(songFileId);
        // console.log(songFileDuration);

        let songPayload = {
          songId:songFileId,
          songName:value.songName,
          songURL:songFileURL,
          songThumbnailURL:songThumbnailURL,
          songFormat: songFileFormat,
          songBytes:songFileBytes,
          songDuration:songFileDuration,
          songSingers:value.songSingers,
          songMood:value.songMood,
          songDirector:value.songDirector
        }
        songData.push(songPayload)
      }))
        let payload = {...albumData,songs:songData}
        console.log(payload);

        let album_collection = doc(__DB,"album_collection",albumData.albumId)
        await setDoc(album_collection,payload)
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className='h-[100%] w-[100%]  flex  justify-center py-2 px-4'>
      <article className='min-h-[800px] w-[75%] bg-slate-800 rounded-lg p-4'>
        <h2 className=' text-center'>Add Album</h2>
        <form className='mt-3' onSubmit={handleSubmit}>
          <h3 className='text-xl'>Album details</h3>
          <article className='mt-4  flex flex-wrap gap-3'>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='' className='block text-[18px]'>Album-Title</label>
            <input type='text' id='albumtitle' placeholder='Enter Album-Title ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' value={albumTitle} name='albumTitle' onChange={handleAlbumChange} />
          </div>
          <div className='flex flex-col gap-2 w-[48%]'> 
            <label htmlFor='' className='block text-[18px]'>Album-Poster</label>
            <input type='file' id='albumposter' placeholder='Enter Album-Title ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black file:bg-slate-600 file:text-white file:rounded-sm file:px-3 ' name='albumPoster' onChange={handleAlbumPosterChange} />
          </div>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='albumdate' className='block text-[18px]'>Release-Date</label>
            <input type='date' id='dob' placeholder='' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' value={albumReleaseDate} name='albumReleaseDate' onChange={handleAlbumChange} />
          </div>
          <div className='flex flex-col gap-2 w-[48%]'>
            <label htmlFor='albumlanguage' className='block text-[18px]'>Languages</label>
            <input type='text' id='languages' placeholder='Enter Languages ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' value={albumLanguages} name='albumLanguages' onChange={handleAlbumChange} />
          </div> 
          <div className='flex flex-col gap-2 w-[98%]'>
            <label htmlFor='' className='block text-[18px] '>Album-Description</label>
            <textarea  id='albumdescription' placeholder='Enter Album-Description' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' value={albumDescription} name='albumDescription' onChange={handleAlbumChange } />
          </div>
          </article>
          <h3 className='text-xl text-center mt-3'>Song-Details</h3>
          <article className='flex flex-col gap-4 mt-3'>
            {songs.map((value,index)=>{
              return (
                <section className='bg-slate-600 py-2 rounded-lg text-center w-[98%] 'key={index}>
                  <h4>Song {index+1}</h4>
                  <main className='flex flex-wrap gap-2 '>
                  <div className='flex flex-col gap-2 w-[32%]'>
            <label htmlFor='songname' className='block text-[18px]'>Song-name</label>
            <input type='text' id='songname' placeholder='Enter song-name ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black ' value={value.songName} name='songName' onChange={(e)=>handleSongChange(e,index)} />
          </div>
          <div className='flex flex-col gap-2 w-[32%]'>
            <label htmlFor='songfile' className='block text-[18px]'>Song-File</label>
            <input type='file' id='songfile' placeholder='Enter song-file ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black  file:bg-slate-600 file:text-white file:rounded-sm file:px-3' name='songFile' onChange={(e)=>handleSongFileChange(e,index)}  />
          </div>
          <div className='flex flex-col gap-2 w-[32%]'>
            <label htmlFor='songthumbnail' className='block text-[18px]'>Song-Thumbnail</label>
            <input type='file' id='songthumbnail' placeholder='' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black  file:bg-slate-600 file:text-white file:rounded-sm file:px-3' name='songThumbnail' onChange={(e)=>handleSongFileChange(e,index)} />
          </div>
          <div className='flex flex-col gap-2 w-[32%]'>
            <label htmlFor='' className='block text-[18px]'>Singers</label>
            <input type='text' id='singers' placeholder='Enter singers ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' value={value.songSingers} name='songSingers' onChange={(e)=>handleSongChange(e,index)} />
          </div>
          <div className='flex flex-col gap-2 w-[32%]'>
            <label htmlFor='' className='block text-[18px]'>Mood</label>
            <input type='text' id='songmood' placeholder='Enter mood ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black'value={value.songMood} name='songMood' onChange={(e)=>handleSongChange(e,index)} />
          </div>
          <div className='flex flex-col gap-2 w-[32%]'>
            <label htmlFor='' className='block text-[18px]'>Director</label>
            <input type='text' id='songdirector' placeholder='Enter director ' className='outline-none bg-amber-50 py-1 px-4 rounded-lg text-black' value={value.songDirector} name='songDirector' onChange={(e)=>handleSongChange(e,index)} />
          </div>
          <div className='flex justify-between w-[100%]'>
            <div>
              {songs.length-1 === index && (
              <input type='button' value="Add song" className='py-2 px-4 rounded-lg bg-fuchsia-700  cursor-pointer' onClick={addSongs}/>)} </div>
            <div>
              {songs.length>1 &&(
            <input type='button' value="Remove song" className='py-2 px-4 rounded-lg bg-red-700  cursor-pointer' onClick={()=>removeSongs(index)}/>)}
            </div>

          </div>
                  </main>
                </section>
              )
            })}
          </article>
          <button className='bg-cyan-500 w-[98%] mt-2 cursor-pointer py-2 rounded-lg hover:bg-cyan-700'>Upload-Album</button> 
        </form>
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default AddAlbum