import React from 'react'

const Login = () => {
  return (
      <>
        <div className="flex bg-[url('/loginbg2.jpg')] bg-gradient-to-t from-black/60 via-black/30 to-transparent bg-cover bg-center min-h-screen align-middle items-center justify-center">
            <div className='flex flex-col  h-115 w-90 bg-black/75 rounded' >
            <h1 className='h-14 w-70 flex justify-center items-center align-middle text-2xl font-medium text-center py-6 px-6 font-sans'>Sign In</h1>
              <form action="" className='px-10 flex flex-col justify-center items-center gap-5 font-sans'>
        <div className='flex align-middle border-black h-10 w-70 bg-zinc-800 rounded '>
                <input  type="text" className='outline-none focus:ring-0' placeholder='Email or number' /> </div>
                <div className='flex align-middle border-black  bg-zinc-800 h-10 w-70 rounded '>
                <input type="password" className='outline-none focus:ring-0  pl-3' placeholder='Password'/> </div>

                <div className='border-red-500 bg-red-500 h-8 w-70 rounded flex justify-center'>
                <button className='border-red-500 bg-red-500  flex rounded'>Sign in</button></div>
                <h4 className='h-6 w-70 flex justify-center'>OR</h4>
                <div className='gap-10'>
                <button className='h-8 w-70 border-black  bg-zinc-800 outline-none focus:ring-0 rounded'>Use in sign-in code</button> <br />
                <div className='flex flex-row gap-x-10 items-center'>
                 <a href="">Forgot password?</a>
                  <div className='flex items-center'>
                <input type="checkbox" id="remember" className='mr-2' />
               <label htmlFor="remember">Remember me</label>
               </div>
                </div> <br />
                <div className=''>
                <h2 className=''>New to netflix?<a href="">Sign up Now</a></h2> <br />
                <h6 className='h-8 w-70 flex justify-center text-sm'>This page is protected by Google reCAPTCHA to ensure you're not a bot.</h6>
                </div>
                </div>
              </form>
            </div>
        </div> 
      </>
  )
}

export default Login
