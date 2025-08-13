import React from 'react'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
   
     <div className=''>
       <Navbar/>
       <div className="hero">
        <img src="/homeScreentesting1.jpg" alt="" className='h-screen object-cover w-full'></img>   
        <div>
         <img src="/title.png" alt="" className='' />
          <p>To All the Boys I've Loved Before is a teen romantic comedy about Lara Jean, whose secret love letters to past crushes are accidentally sent out, turning her quiet high school life into a whirlwind of awkward, funny, and heartwarming moments.</p>
        </div>
        </div>
    </div>
 </>
  )
}

export default Home
