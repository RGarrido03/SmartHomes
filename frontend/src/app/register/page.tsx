import React from 'react';
import image from './bg_75.gif';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='p-5 justify-center'>
      <div className="relative h-screen">
        <Image
          src={image}
          alt="Background"
          className="absolute blur-sm inset-0 w-full h-50 object-cover rounded-2xl brightness-70"
        />

        <div className='absolute bg-background rounded-xl justify-center w-full h-full p-4 space-y-9 '>
          <p className='text-7xl font-extrabold justify-center animate-pulse '>Register</p>
          <div className="p4 space-y-4 justify-center">
            <form className="row-auto grid">
              <label className="pb-1 text-lg font-medium">Username</label>
              <input
                className="mt-1 rounded-md bg px-3 py-2 sm:text-sm"
                type="username"
                name="username"
              />
              <label className="pb-1 text-lg font-medium">Email</label>
              <input
                className="mt-1 rounded-md bg px-3 py-2 sm:text-sm"
                type="email"
                name="email"
              />
              <label className="pb-2 pt-2 text-lg font-medium">Password</label>
              <input
                className="mt-1 rounded-md bgs px-3 py-2 sm:text-sm"
                type="password"
                name="password"
              />
            </form>
          </div>  
          <Link href="/register" className="rounded-lg bg-primary px-4 py-2 text-base font-medium ">
              Register
          </Link>        
        </div>

      </div>
    </div>
    
  );
}
