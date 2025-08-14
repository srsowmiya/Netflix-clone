import React from 'react'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { CiCircleInfo } from "react-icons/ci";

const Home = () => {
  return (
    <>
   
     <div className=''>
       <Navbar/>
       <div className="hero">
        <img src="/homeScreentesting1.jpg" alt="" className='relative h-screen object-cover w-full'></img>   
        <div className='absolute bottom-0 left-0 flex flex-col items-start'>
         <img src="/text-home.png" alt="" className='w-100 ' />
          <p className='w-140 font-medium' >A shy high school girl’s secret love letters are accidentally sent to her past crushes. Chaos turns into unexpected romance when one of them proposes a fake relationship.</p>
          {/* the text section */}
      <div className="flex flex-row gap-3">
        {/* play button */}
      <div className="flex flex-row items-center justify-center gap-2 h-10 px-4 w-32 bg-white rounded">
        <FontAwesomeIcon icon={faPlay} className="text-black text-xl" />
        <p className="text-black font-medium leading-none">Play</p>
      </div>
      {/* more info button */}
      <div className="flex flex-row items-center justify-center gap-2 px-4 py-2 w-32 bg-white rounded text-black">
        <button><CiCircleInfo className="text-xl font-extrabold" /></button>
        <p className="capitalize font-medium leading-none">More Info</p>
      </div>
    </div>

        </div>
        </div>
    </div>
 </>
  )
}

export default Home
