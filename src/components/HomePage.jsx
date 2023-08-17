import { useState } from "react";
import axios from "axios";
import SearchedVideos from './SearchedVideos';
import DemoVideos from './DemoVideos';
import Loader from './Loader';
import {Link} from 'react-router-dom';

function HomePage() {

    const [searchTerm, setSearchTerm] = useState('');
    const[videos, setVideos] = useState([]);
    const[selectedVideo, setSelectedVideo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const apikey = import.meta.env.VITE_API_KEY;

    const submitHandler = async(event) => {
        event.preventDefault();
        setIsLoading(true);

        try{
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                   part: 'snippet',
                   maxResults: 20,
                    key: apikey,
                    q: searchTerm,
                  }
             });
             setVideos(response.data.items);
             setSelectedVideo(response.data.items[0]);
             console.log(response.data.items[0]);
        }
        catch(error){
            console.error("Fetch error: ",error);
        }finally{
            setIsLoading(false);
        }
    }

    const changeHandler = (event) => {
        setSearchTerm(event.target.value);
    }

  return (
    <div className="">
    <div className="flex flex-col md:flex-row md:items-center justify-between m-0">
        <Link to={'/'} >
            <img src="https://download.logo.wine/logo/YouTube/YouTube-Logo.wine.png" alt="youtube" className="w-36 md:w-48" />
        </Link>
        <form onSubmit={submitHandler} className="flex justify-center">
            <input
                type="text" 
                placeholder='Search...' 
                onChange={changeHandler} 
                value={searchTerm}
                className="w-64 px-4 py-1 md:w-96 md:px-6 md:mt-1 md:py-1 border border-gray-700 rounded-l-2xl" 
            />
            <button 
                type="submit" 
                className="border py-1 md:mt-1 px-3 border-gray-900 rounded-r-2xl border-l-0 hover:bg-gray-200"
            >
                <img src="https://www.freeiconspng.com/uploads/search-icon-png-9.png" alt="search" className="w-5 bg-blend-multiply" /> 
            </button>
        </form>
        <div className="flex items-center space-x-3">
            <img src="https://cdn0.iconfinder.com/data/icons/app-user-interface-line-1/64/Video_UI-UX_Application_User_Interface-512.png" alt="create" className="hidden md:inline-block w-10"/>
            <img src="https://www.citypng.com/public/uploads/preview/-11594729466un69bnbisu.png" alt="notifications" className="hidden md:inline-block w-7"/>
            <img src="https://beconnected.esafety.gov.au/pluginfile.php/82025/mod_resource/content/1/t35_c5_a2_p2.png" alt="signin" className="hidden md:inline-block w-40 bg-transparent"/>
        </div>
        </div>
        <div>
            {isLoading?(
                <Loader />
            ): selectedVideo ? (
                videos.map((v) => <SearchedVideos video={v} key={v.id.videoId} id={v.id.videoId} />
                )
            ):(
                <DemoVideos />
            )
            }
        </div>
    </div>
  )
}

export default HomePage;