import './output.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './routes/LoginComponent';
import SignUpComponent from './routes/SignUpComponent';
import HomeComponent from './routes/HomeComponent';
import UploadSongComponent from './routes/UploadSongComponent';
import MySongsComponent from './routes/MySongsComponent';
import SearchComponent from './routes/SearchComponent';
import DashboardComponent from './routes/DashboardComponent';
import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [cookie, setCookie] = useCookies(['token']);
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        {
          cookie.token ? (
            <songContext.Provider value={{ currentSong, setCurrentSong, cookie, isPaused, setIsPaused, soundPlayed, setSoundPlayed }}>
            <Routes>
             
                <Route path="/dashboard" element={<DashboardComponent />} />
                <Route path="/my-music" element={<MySongsComponent />} />
                <Route path="/home" element={<DashboardComponent />} />
                <Route path="/search" element={<SearchComponent />} />
                <Route path="/uploadsong" element={<UploadSongComponent />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
           
            </Routes>
            </songContext.Provider>
     
     
           ) : (

            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignUpComponent />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        )
      }
      </BrowserRouter>
    </div>
  )
};


export default App;
