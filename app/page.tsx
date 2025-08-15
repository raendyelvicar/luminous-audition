'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get('for') || '';
  const slug = name.replace(/ /g, '-');

  const handleClick = () => {
    if (name) {
      router.push(`/${slug}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {name ? (
        <>
          <h1>Hi, {name}</h1>
          <button onClick={handleClick}>Buka Pengumuman</button>
        </>
      ) : (
        <h1>Silakan masukkan parameter ?for=NamaAnda di URL</h1>
      )}
    </div>
  );
}
