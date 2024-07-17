import React, { useState } from 'react'
import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { useNavigate } from 'react-router-dom';
import { makeAuthenticatedPOSTRequests } from '../utils/serverHelpers';
import LoggedInContainer from '../containers/LoggedInContainer';
const UploadSongComponent = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [track, setTrack] = useState('');
    const [playlistUrl, setPlaylistUrl] = useState('');
    // const [uploadedFileName, setUploadedFileName] = useState('');

    console.log(name, thumbnail, track, playlistUrl);
    const uploadSong = async () => {
        const data = {
            name,
            thumbnail,
            track: playlistUrl
        };

        console.log(data);
        try {
            const response = await makeAuthenticatedPOSTRequests("https://musically-0i47.onrender.com/song/create", data);
            console.log(response);
            navigate('/dashboard');
            alert("Song uploaded successfully");
        } catch (error) {
            console.error('Upload failed:', error);
            alert(`Upload failed: ${error.message}`);
        }
    };

    return (

        <LoggedInContainer>
            <div className='text-white text-2xl font-bold'>Enter song details to upload</div>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <div className='w-1/3'>
                    <TextInput
                        label={"Song Title"}
                        labelClass={'text-white'}
                        placeholder={"Enter song title"}
                        className={"my-3"}
                        value={name}
                        setValue={setName}
                    />
                    <TextInput
                        label={"Thumbnail"}
                        labelClass={'text-white'}
                        placeholder={"Enter song title"}
                        className={"my-3"}
                        value={thumbnail}
                        setValue={setThumbnail}
                    />
                    <CloudinaryUpload setUrl={setPlaylistUrl} />

                    <div
                        className='w-1/3 flex justify-center bg-white p-2 my-3 rounded-full cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            uploadSong();
                        }}
                    >Upload Song</div>
                </div>
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
        //         <div className='w-full h-9/10 p-8'>

        //         </div>
        //     </div>
        // </div>

    )
}

export default UploadSongComponent;
