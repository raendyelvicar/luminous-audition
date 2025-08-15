'use client';

import LogoLoader from '@/components/logo-loader';
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get('for') || '';
  const slug = name.replace(/ /g, '-');
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (name) {
      setLoading(true);
      const timer = setTimeout(() => {
        router.push(`result/${slug}`);
      }, 6000); // 6 detik
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        {loading ? (
          <>
            <LogoLoader />
          </>
        ) : name ? (
          <>
            <h4 className='scroll-m-20 text-xl font-semibold tracking-tight mb-3'>
              Hi, <span>{name}</span>
            </h4>
            <Button className='cursor-pointer' onClick={handleClick}>
              Lihat Pengumuman
            </Button>
          </>
        ) : (
          <></>
        )}{' '}
      </div>
    </div>
  );
}
