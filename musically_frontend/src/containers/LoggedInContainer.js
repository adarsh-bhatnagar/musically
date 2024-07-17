import React from 'react'
import { useState } from 'react';
import { Howl, Howler } from 'howler';
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react'
import { Link } from "react-router-dom"
import TextWithHover from '../components/shared/TextWithHover';
import { useContext } from 'react';
import songContext from '../contexts/songContext';
import { useLayoutEffect, useRef } from 'react';
const LoggedInContainer = ({ children }) => {
    const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused } = useContext(songContext);
    console.log(currentSong);
    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        if (!currentSong) {
            return
        }
        changeSong(currentSong.track)
    }, [currentSong && currentSong.track])

    const playSound = () => {
        if (!soundPlayed) {
            return
        }
        soundPlayed.play()
        setIsPaused(false)
    }
    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false)
    }

    const pauseSound = () => {
        soundPlayed.pause();
    }

    const togglePlayPause = () => {
        if (isPaused) {
            playSound(currentSong.track);
            setIsPaused(false);
        }
        else {
            pauseSound();
            setIsPaused(true);
        }
    }

    return (
        <div className='w-full h-full font-ubuntu'>
            <div className={`${currentSong ? 'h-9/10' : "h-full"} w-full h-9/10 flex`}>
                <div className={`w-1/5 "h-full" bg-black p-3 flex flex-col justify-between pb-10`}>
                    <div>
                        <div className='my-4'>
                            <Icon icon="mdi:music" color='white' fontSize={50} />
                        </div>
                        <div className='py-7'>
                            <Link to="/home"> <IconText iconName="material-symbols:home" displayText="Home" /></Link>
                            <Link to="/search">     <IconText
                                iconName="ic:outline-search"
                                displayText="Search"
                            /> </Link>
                            <IconText iconName="icomoon-free:books" displayText="Library" />
                        </div>
                        <div className='mt-4'>
                            <IconText iconName="basil:add-solid" displayText="Create Playlist" />
                            <IconText iconName="bxs:heart-square" displayText="Liked Songs" />
                            <Link to={"/my-music"}> <IconText iconName="ic:twotone-queue-music" displayText="My Music" /></Link>
                        </div>
                    </div>
                    <div className='w-2/5 flex items-center justify-center text-white border border-gray-300 rounded-full m-3'>
                        <Icon icon="ic:baseline-language" fontSize={27} color='white' />
                        <div className='m-2'>English</div>
                    </div>
                </div>
                <div className='h-full w-4/5 bg-slate-900 bg-opacity-30'>
                    <div className='w-full h-1/10 bg-black flex items-center justify-end px-10'>
                        <div className='w-1/2 h-full flex items-center'>
                            <div className='flex justify-around items-center w-3/5 border border-r-2' >
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                            </div>

                            <div className='flex justify-around items-center w-2/5 px-4'>
                                <Link to="/uploadsong"> <TextWithHover displayText={"Upload Song"} /> </Link>
                                <Link to={"/profile"}>  <div className='flex h-1/2 w-full p-2 bg-white rounded-full items-center justify-center cursor-pointer hover:font-bold'>AB</div> </Link>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-9/10 bg-gray-900 bg-opacity-25 overflow-auto p-9'>
                        {children}
                    </div>
                </div>
            </div>
            {
                currentSong && <div className='w-full h-1/10 bg-black flex items-center p-3 justify-between'>
                    <img
                        src={currentSong.thumbnail}
                        className='w-16 h-16 bg-cover rounded-lg ml-4'
                    />
                    <div className='pl-3 w-1/4'>
                        <div className='text-white font-semibold cursor-pointer hover:underline'>
                            {currentSong.name}
                        </div>
                        <div className='text-xs text-gray-400 cursor-pointer hover:underline'>
                            {currentSong.artist.firstName + " " + currentSong.artist.lastName}
                        </div>
                    </div>

                    <div className='w-1/2 p-2 flex items-center space-x-7 justify-center '>
                        <Icon icon={'ri:shuffle-line'} fontSize={25} className='text-gray-400 cursor-pointer hover:text-white ' />
                        <Icon icon={'fluent:previous-48-filled'} fontSize={25} className='text-gray-400 cursor-pointer hover:text-white ' />
                        <Icon
                            icon={isPaused ? 'icon-park-solid:play' : 'zondicons:pause-solid'}
                            fontSize={40}
                            className='text-gray-400 cursor-pointer hover:text-white'
                            onClick={() => { togglePlayPause() }}
                        />
                        <Icon icon={'fluent:next-48-filled'} fontSize={25} className='text-gray-400 cursor-pointer hover:text-white ' />
                        <Icon icon={'ic:outline-repeat'} fontSize={25} className='text-gray-400 cursor-pointer hover:text-white ' />
                    </div>

                    <div className='w-1/4 bg-red-200 p-2 text-white flex justify-end'>
                        Last Div
                    </div>
                </div>
            }

        </div>

    )
}

export default LoggedInContainer