'use client';

import { motion } from 'framer-motion';
import { Candidate } from '@/app/types/candidate';
import BackgroundMusic from '@/components/background-music';
import ConfettiButton from '@/components/confetti-button';

export default function CandidateDetailClient({
  candidate,
}: {
  candidate: Candidate;
}) {
  return (
    <>
      <BackgroundMusic isPasses={candidate.status === 'Lolos'} />
      {candidate.status === 'Lolos' && <ConfettiButton />}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='min-h-screen flex items-center justify-center bg-gray-50 p-6'
      >
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl p-10 relative overflow-hidden'>
          {/* Garis horizontal tipis */}
          <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className='w-full border-t border-gray-200'
                style={{ top: `${i * 2}rem`, position: 'absolute' }}
              />
            ))}
          </div>

          {/* Isi surat */}
          <div className='relative text-center space-y-6'>
            <p className='text-lg font-medium'>
              Hi <span className='font-bold'>{candidate.name}</span>!
            </p>

            {candidate.status === 'Lolos' ? (
              <>
                <p className='text-2xl font-bold text-green-500'>
                  🎉 SELAMAT! Kamu berhasil lolos audisi Luminous Crew! 🎉
                </p>
                <p className='text-base'>{candidate.message}</p>
              </>
            ) : (
              <>
                <p className='text-2xl font-bold text-red-500'>
                  Terima kasih sudah mengikuti audisi Luminous Crew! 💜
                </p>
                <p className='text-base'>{candidate.message}</p>
              </>
            )}

            <p className='mt-8 text-sm italic'>— Tim Luminous Crew</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
