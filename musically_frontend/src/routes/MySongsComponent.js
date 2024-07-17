import React, { useEffect, useState } from 'react'
import IconText from '../components/shared/IconText';
import { Howl, Howler } from 'howler';
import TextInput from '../components/shared/TextInput';
import SingleSongCard from '../components/shared/SingleSongCard';
import { makeAuthenticatedGETRequests } from '../utils/serverHelpers';
import LoggedInContainer from '../containers/LoggedInContainer';

const UploadSongComponent = () => {

    const [songData, setSongData] = useState([]);
    const [soundPlayed, setSoundPlayed] = useState(null);

    const playSound = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
        });
        setSoundPlayed(sound);
        sound.play();
        console.log("sound played");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeAuthenticatedGETRequests("http://localhost:8000/song/get/songs", songData);
                console.log(response.data);
                setSongData(response.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (

        <LoggedInContainer >
            <div className='text-white text-2xl font-bold py-6'>My Songs</div>
            <div className='space-y-3'>
                {
                    songData.map((item) => {
                        return <SingleSongCard
                            info={item}
                            playSound={playSound}
                        />
                    })
                }
            </div>
        </LoggedInContainer>
        // <div className='w-full h-full flex font-ubuntu'>
        //     <div className='w-1/5 h-full bg-black p-3 flex flex-col justify-between pb-10'>
        //         <div>
        //             <div className='my-4'>
        //                 <Icon icon="mdi:music" color='white' fontSize={50} />
        //             </div>
        //             <div className='py-7'>
        //                 <Link to="/home"> <IconText iconName="material-symbols:home" displayText="Home" /></Link>
        //                 <IconText iconName="ic:outline-search" displayText="Search" />
        //                 <IconText iconName="icomoon-free:books" displayText="Library" />
        //             </div>
        //             <div className='mt-4'>
        //                 <IconText iconName="basil:add-solid" displayText="Create Playlist" />
        //                 <IconText iconName="bxs:heart-square" displayText="Liked Songs" />
        //             </div>
        //         </div>
        //         <div className='w-2/5 flex items-center justify-center text-white border border-gray-300 rounded-full m-3'>
        //             <Icon icon="ic:baseline-language" fontSize={27} color='white' />
        //             <div className='m-2'>English</div>
        //         </div>
        //     </div>
        //     <div className='h-full w-4/5 bg-slate-900 bg-opacity-30'>
        //         <div className='w-full h-1/10 bg-black flex items-center justify-end px-10'>
        //             <div className='w-1/2 h-full flex items-center'>
        //                 <div className='flex justify-around items-center w-3/5 border border-r-2' >
        //                     <TextWithHover displayText={"Premium"} />
        //                     <TextWithHover displayText={"Support"} />
        //                     <TextWithHover displayText={"Download"} />
        //                 </div>

        //                 <div className='flex justify-around items-center w-2/5 px-4'>
        //                     <Link to="/uploadsong"> <TextWithHover displayText={"Upload Song"} /> </Link>
        //                     <Link to={"/profile"}>  <div className='flex h-1/2 w-full p-2 bg-white rounded-full items-center justify-center cursor-pointer hover:font-bold'>AB</div> </Link>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className='w-full h-9/10 p-8 overflow-auto'>

        //         </div>

        //     </div>
        // </div>

    )
}

export default UploadSongComponent;