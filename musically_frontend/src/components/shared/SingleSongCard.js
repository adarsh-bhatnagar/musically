import { Icon } from "@iconify/react/dist/iconify.js"
import songContext from "../../contexts/songContext"
import { useContext } from "react"

const SingleSongCard = ({info, playSound}) => {

    const {currentSong, setCurrentSong} = useContext(songContext);

    return (

        <div className="flex items-center space-x-6 hover:bg-gray-800 bg-opacity-20 p-2 rounded-md" onClick={() =>
        setCurrentSong(info) } >
            <div className="h-12 w-12 bg-white bg-cover bg-center" style={{backgroundImage: `url(${info.thumbnail})`}}>
            </div>
            <div className="w-5/6">
                <div className="text-white hover:underline cursor-pointer" >
                    {info.name}
                </div>
                <div className="text-gray-400 text-xs hover:underline cursor-pointer" >
                    {info.artist.firstName + " " + info.artist.lastName}
                </div>
            </div>
            <div className="w-1/6 text-gray-400 flex justify-around" >
            <div>
                4:05
            </div>
            <div>
               <Icon cursor={"pointer"} icon="ph:dots-three" fontSize={27} />
            </div>
            </div>
        </div>
    )
}

export default SingleSongCard