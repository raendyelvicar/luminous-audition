'use client';

import Image from 'next/image';

export default function LogoLoader() {
  return (
    <div className='logo-loader'>
      <div className='logo-wrapper'>
        <Image
          src='/logo.png'
          alt='Logo'
          width={100}
          height={100}
          priority
          className='logo-img'
        />
      </div>
    </div>
  );
}
