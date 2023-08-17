import { data } from './DemoData.js';
import { Link } from 'react-router-dom';

function DemoVideos() {
  return (
    <div>
      <div className='flex flex-wrap mt-4 justify-center md:mx-0'>
        {
            data.map((v) => (
                <Link key={v.id} to={`/watch/${v.id}`} className='mx-1 font-medium hover:cursor-pointer'>
                    <img src={v.thumbnail} alt={v.id} className='rounded-xl my-3'/>
                    <h2 className='w-80'>{v.title}</h2>
                    <h4 className='text-sm text-gray-500'>{v.channel}</h4>
                </Link>
            ))
        }
    </div>
    </div>
  )
}

export default DemoVideos;