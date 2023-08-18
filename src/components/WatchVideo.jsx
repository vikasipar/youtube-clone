import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function WatchVideo() {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);

    useEffect(() => {

      async function fetchVideoData(){
        try{
          const apiKey = import.meta.env.VITE_API_KEY;
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);

          setVideoData(response.data.items[0].snippet);
        }catch(error){
          console.error("Data Fetch Error: ", error);
        }
      }

      async function fetchRelatedVideos(){
        try{
          const apiKey = import.meta.env.VITE_API_KEY;
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&reltedToVideoId=${videoId}&maxResults=6`);

          setRelatedVideos(response.data.items);
        }catch(error){
          console.error("Related Videos Fetch Error: ", error);
        }
      }

      fetchVideoData();
      fetchRelatedVideos();

    }, [videoId]);


  return (
    <div>
    <div className="flex flex-col md:flex-row md:items-center justify-between m-0">
        <Link to={'/'} >
            <img src="https://download.logo.wine/logo/YouTube/YouTube-Logo.wine.png" alt="youtube" className="w-36 md:w-48" />
        </Link>

        <div className="flex items-center space-x-3">
            <img src="https://cdn0.iconfinder.com/data/icons/app-user-interface-line-1/64/Video_UI-UX_Application_User_Interface-512.png" alt="create" className="hidden md:inline-block w-10"/>
            <img src="https://www.citypng.com/public/uploads/preview/-11594729466un69bnbisu.png" alt="notifications" className="hidden md:inline-block w-7"/>
            <img src="https://beconnected.esafety.gov.au/pluginfile.php/82025/mod_resource/content/1/t35_c5_a2_p2.png" alt="signin" className="hidden md:inline-block w-40 bg-transparent"/>
        </div>
    </div>
    <div className='md:flex md:mt-4'>
    <div className='mx-2 md:w-8/12'>
        <div className="mx-auto flex justify-center">
            <iframe
                className="h-[190px] md:h-[510px]"
                width="100%"
                src={`https://www.youtube.com/embed/${ videoId }?autoplay=1`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>

        {videoData && (
          <div className='text-justify'>
            <h2 className='text-lg md:text-2xl font-medium mt-2 my-1 md:my-3 mx-3'>{videoData.title}</h2>
            <h3 className='text-md md:text-lg font-medium md:my-1 mx-2 md:mx-5'>{videoData.channelTitle}</h3>
            <h4 className='md:py-3 px-2 md:px-9 bg-slate-50 rounded-md'>
              <details>
                <summary><b>Description : </b></summary>
                {videoData.description}
              </details></h4>
          </div>
        )}
    </div>

    <div className='md:w-3/12 mx-1' >
      <h2 className='hidden md:block text-left ml-9 text-lg'>Related Videos</h2>
      <div>
        {
          relatedVideos.map((v) => (
            <Link key={v.id.videoId} key={v.id.videoId} to={`/watch/${v.id.videoId}`} className='flex md:ml-8'>
              <img src={v.snippet.thumbnails.default.url} alt={v.snippet.title} className="rounded-lg h-max md:rounded-sm mx-4 my-3 hover:rounded-none hover:cursor-pointer" />
              <div className="flex-col w-fit md:space-y-1">
                  <h2 className="text-lg md:text-sm text-left font-medium md:font-normal mt-2 overflow-hidden overflow-ellipsis" >{v.snippet.title}</h2>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
    </div>
    </div>
  )
}

export default WatchVideo;