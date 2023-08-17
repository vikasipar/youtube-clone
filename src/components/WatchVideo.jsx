import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
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
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&relatedToVideoId=${videoId}&type=video&part=snippet&maxResults=9`);
  
          setRelatedVideos(response.data.items);
        }catch(error){
          console.error("Related Videos Fetch Error: ", error);
        }
      }

      fetchVideoData();
      fetchRelatedVideos();

    }, [videoId]);


  return (
    <div className='flex mt-24'>
    <div className='w-7/12 border border-black'>
        <div className="mx-auto flex justify-center">
            <iframe
                className=""
                height="490px"
                width="890px"
                src={`https://www.youtube.com/embed/${ videoId }?autoplay=1`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>

        {videoData && (
          <div className='text-justify'>
            <h2 className='text-2xl font-medium my-2 mx-3'>{videoData.title}</h2>
            <h3 className='text-lg font-medium my-1 mx-5'>{videoData.channelTitle}</h3>
            <h4 className='py-3 px-9 bg-slate-50 rounded-md'><b>Description : </b>{videoData.description}</h4>
          </div>
        )}
    </div>

    <div className='w-3/12 mx-1' >
      <h2 className='text-left ml-9 text-lg'>Related Videos</h2>
      <div>
        {
          relatedVideos.map((v) => (
            <div key={v.id.videoId} className='flex ml-8'>
              <img src={v.snippet.thumbnails.default.url} alt={v.snippet.title} className="rounded-lg h-max md:rounded-sm mx-4 my-3 hover:rounded-none hover:cursor-pointer" />
              <div className="flex-col md:space-y-1">
                  <h2 className="text-lg md:text-sm text-left font-medium md:font-normal mt-2" >{v.snippet.title}</h2>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default WatchVideo;