'use client';

import { useEffect, useState } from 'react';
import { MemberTable } from '@/components/member-table';
import AdminFormPage from './form/page';
import { Separator } from '@/components/ui/separator';
import { getCandidates } from '../services/candidates';

export default function AdminPage() {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    const data = await getCandidates();
    setCandidates(data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className='mb-5'>
          <AdminFormPage onSuccess={fetchCandidates} />
        </div>
        <Separator className='mb-5' />
        <div>
          <MemberTable
            candidates={candidates}
            onDeleteSuccess={fetchCandidates}
          />
        </div>
      </div>
    </div>
  );
}
