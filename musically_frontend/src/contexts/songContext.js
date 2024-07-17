import {createContext} from 'react';

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => {},
    isPaused: null,
    setIsPaused: () => {},
    soundPlayed: null,
    setSoundPlayed: () =>{}
});

export default songContext