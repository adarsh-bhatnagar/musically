import React from 'react'
import LoggedInContainer from '../containers/LoggedInContainer';
const HomeComponent = () => {
    const focusCardsData = [
        {
            title: "Peaceful Piano",
            description: "Relax and indulge with beautiful piano pieces",
            imgUrl: "https://images.pexels.com/photos/586415/pexels-photo-586415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            title: "Deep Focus",
            description: "Focus on your goal until it is achieved",
            imgUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            title: "Instrumental music",
            description: "Listen to instrumental music that excites you",
            imgUrl: "https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            title: "Focus Flow",
            description: "Maintain and improve your focus flow though musically",
            imgUrl: "https://images.pexels.com/photos/6401668/pexels-photo-6401668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            title: "Beats to think me",
            description: "Listen to beats which force you to think more about yourself",
            imgUrl: "https://images.pexels.com/photos/21022/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }]
    return (

        <LoggedInContainer >
            <div className='h-9/10 w-full p-8 overflow-auto'>
                <PlaylistView
                    title="Focus"
                    cardsData={focusCardsData}
                />
                <PlaylistView
                    title="Musically Playlist"
                    cardsData={focusCardsData}
                />
                <PlaylistView
                    title="Sounds of India"
                    cardsData={focusCardsData}
                />
            </div>
        </LoggedInContainer>
        // <div className='w-full h-full flex font-ubuntu'>
        //     <div className='w-1/5 h-full bg-black p-3 flex flex-col justify-between pb-10'>
        //     <div>
        //     <div className='my-4'>
        //     <Icon icon="mdi:music" color='white' fontSize={50} />
        //     </div>
        //     <div className='py-7'>
        //       <Link to="/home"> <IconText iconName="material-symbols:home" displayText="Home" /></Link> 
        //         <IconText iconName="ic:outline-search" displayText="Search" />
        //         <IconText iconName="icomoon-free:books" displayText="Library" />
        //         </div>
        //         <div className='mt-4'>
        //         <IconText iconName="basil:add-solid" displayText="Create Playlist" />
        //         <IconText iconName="bxs:heart-square" displayText="Liked Songs" />
        //         </div>
        //         </div>
        //         <div className='w-2/5 flex items-center justify-center text-white border border-gray-300 rounded-full m-3'>
        //             <Icon icon="ic:baseline-language" fontSize={27} color='white' />
        //             <div className='m-2'>English</div>
        //         </div>
        //     </div>
        //     <div className='h-full w-4/5 bg-slate-900 bg-opacity-30'>
        //         <div className='w-full h-1/10 bg-black flex items-center justify-end px-10'>
        //             <div className='w-1/2 h-full flex items-center'>
        //         <div className='flex justify-around items-center w-3/5 border border-r-2' >
        //             <TextWithHover displayText={"Premium"} /> 
        //             <TextWithHover displayText={"Support"} /> 
        //             <TextWithHover displayText={"Download"} /> 
        //             </div>

        //             <div className='flex justify-around items-center w-2/5 px-4'>
        //           <Link to="/signup"> <TextWithHover displayText={"Sign up"} /> </Link> 
        //          <Link to={"/login"}>  <div className='flex h-1/2 w-full p-2 bg-white rounded-full items-center justify-center cursor-pointer hover:font-bold'>Log in</div> </Link> 
        //             </div> 
        //         </div>
        //         </div>

        //     </div>
        // </div>

    )
}


const PlaylistView = ({ title, cardsData }) => {
    return (
        <div h-full w-full>
            <div className='text-white text-2xl font-semibold'>{title}</div>
            <div className='w-full py-5 flex justify-between space-x-4' >

                {
                    cardsData.map((item => {
                        return <Card title={item.title} description={item.description} imgUrl={item.imgUrl} />
                    }))
                }

            </div>
        </div>
    )

};

const Card = ({ title, description, imgUrl }) => {
    return (
        <div className='w-1/5 bg-gray-900 p-3 rounded-lg'>
            <div className='py-6'>
                <img className='rounded-lg w-full' src={imgUrl} alt='thumbnail' />
            </div>
            <div>
                <div className='text-white font-semibold'>{title}</div>
                <div className='text-gray-400 text-sm'>{description}</div>
            </div>
        </div>
    )
}

export default HomeComponent;