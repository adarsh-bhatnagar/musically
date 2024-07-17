import { Icon } from "@iconify/react/dist/iconify.js"
import LoggedInContainer from "../containers/LoggedInContainer"
import { useState } from 'react'
import { makeAuthenticatedGETRequests } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchComponent = () => {
    const [isFocussed, setIsFocussed] = useState(false);
    const [songData, setSongData] = useState([]);
    const [searchText, setSearchText] = useState("");

    const searchSong = async () => {
            const response = await makeAuthenticatedGETRequests("http://localhost:8000/song/get/songname/" + searchText);
            console.log(response)
            setSongData(response.data);
            setSearchText("");
    }
    return ( 
            <LoggedInContainer>
                <div className="w-full">
                <div 
                className={`w-1/3 rounded-full bg-gray-800 p-3 flex space-x-3 ${isFocussed && "border border-white"} `}
                onFocus={() => setIsFocussed(true)}
                onBlur={() => setIsFocussed(false)}
                >
                <Icon icon="ic:baseline-search" color="white" fontSize={27} />
                    <input 
                    type="text" 
                    placeholder="What do you want to listen?" 
                    className="w-full bg-transparent text-white focus:outline-none"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchSong()}
                    />
                </div>
                <div className="py-6">
                {
                    songData.map((item) => {
                        return <SingleSongCard info={item} key={JSON.stringify(item)} playSound={() => {}}/>
                    })
                }
                </div>
                </div>
            </LoggedInContainer>
    )
}

export default SearchComponent