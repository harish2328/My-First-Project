import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AlbumContextAPI } from "../../context/AlbumContext";

const AlbumDetails = () => {
  let data = useLocation();
  let {
    state: { album },
  } = data;
  console.log(album);
  let {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(AlbumContextAPI);

  let handleClick = (index) => {
    setSongs(album.songs);
    setCurrentSongIndex(index);
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  console.log(songs);
  console.log(isPlaying);
  console.log(currentSongIndex);
  

  const formatduration = (durationInSeconds) => {
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="p-8">
      <article className=" flex gap-8">
        <aside className="shrink-0">
          <img
            src={album.albumPoster}
            className="h-[300px] rounded-lg w-[200px]"
            alt=""
          />
        </aside>
        <aside>
          <h2 className="text-2xl font-semibold">{album.albumTitle}</h2>
          <ul className="mt-4 flex flex-col gap-3 text-lg">
            <li className="flex">
              <span className="w-[120px]">Title</span>
              <span>{album.albumTitle}</span>
            </li>
            <li className="flex">
              <span className="w-[120px]">No of Tracks</span>
              <span>{album.songs.length}</span>
            </li>
            <li className="flex">
              <span className="w-[120px]">ReleaseData</span>
              <span>{album.albumReleaseDate}</span>
            </li>
            <li className="flex">
              <span className="w-[120px]">Language</span>
              <span>{album.albumLanguages}</span>
            </li>
            <li className="flex">
              <span className="w-[120px] shrink-0">Description</span>
              <span>{album.albumDescription}</span>
            </li>
          </ul>
        </aside>
      </article>
      <main className={`p-2 mt-4 bg-slate-600 rounded-lg ${currentSongIndex !==null && "mb-[120px]"}`}>
        <h3 className="text-xl px-4">Songs List</h3>
        <table className="w-full mt-4 text-left bg-slate-700 uppercase rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Track</th>
              <th className="px-4 py-2">Song-Name</th>
              <th className="px-4 py-2">Singers</th>
              <th className="px-4 py-2">Director</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Mood</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {album.songs.map((song, index) => {
              return (
                <tr
                  className="border-2 border-slate-500 hover:border-slate-400 "
                  onClick={()=>handleClick(index)}
                >
                  <td className="py-2  text-center">{index + 1}</td>
                  <td className="py-2 text-center">
                    <img
                      src={song.songThumbnailURL}
                      className="h-12 w-[50px] rounded-lg"
                      alt=""
                    />
                  </td>
                  <td className="py-2">{song.songName}</td>
                  <td className="py-2">{song.songSingers}</td>
                  <td className="py-2">{song.songDirector}</td>
                  <td className="py-2">{formatduration(song.songDuration)}</td>
                  <td className="py-2">{song.songMood}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default AlbumDetails;
