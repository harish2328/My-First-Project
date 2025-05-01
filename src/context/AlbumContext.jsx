import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { __DB } from "../backend/FirebaseConfig";

export const AlbumContextAPI = createContext();

let AlbumProvider = (props) => {
  let [album, setalbum] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  useEffect(() => {
    let fetchAlbums = async () => {
      try {
        setIsLoading(true);
        let album_collection = collection(__DB, "album_collection");
        let albumSnapshot = await getDocs(album_collection);
        let albumList = albumSnapshot.docs.map((doc) => doc.data());
        console.log(albumList);
        setalbum(albumList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <AlbumContextAPI.Provider
      value={{
        album,
        isLoading,
        songs,
        setSongs,
        isPlaying,
        setIsPlaying,
        currentSongIndex,
        setCurrentSongIndex,
      }}
    >
      {props.children}
    </AlbumContextAPI.Provider>
  );
};

export default AlbumProvider;
