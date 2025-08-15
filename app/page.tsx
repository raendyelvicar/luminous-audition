'use client';
import ContentHome from '@/components/content-home';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <ContentHome />
    </Suspense>
  );
}
