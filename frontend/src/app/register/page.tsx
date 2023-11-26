import React from 'react';
import image from './bg_75.gif';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='p-5'>
      <div className="relative h-screen">
        <Image
          src={image}
          alt="Background"
          className="absolute blur-sm inset-0 w-full h-full object-cover rounded-2xl"
        />
        
        <div className="absolute inset-0 flex items-center justify-center text-white text-8xl font-extrabold">
          Register
        </div>
      </div>
    </div>
    
  );
}
