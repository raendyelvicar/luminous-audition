'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { CandidateWithUrl } from '@/app/types/candidate';
import { deleteCandidate } from '@/app/services/candidates';
import { CopyButton } from './copy-button';
import { CopyAllButton } from './copy-all-button';
import { Button } from './ui/button';
import { toast } from 'sonner';
import router from 'next/router';

export function MemberTable({
  candidates,
  onDeleteSuccess,
}: {
  candidates: CandidateWithUrl[];
  onDeleteSuccess?: () => void;
}) {
  const handleDeleteCandidate = async (id: number) => {
    if (!confirm('Yakin ingin menghapus kandidat ini?')) return;

    const res = await deleteCandidate(id);
    if (res) {
      toast.success('Kandidat berhasil dihapus');
      onDeleteSuccess?.(); // <-- panggil fetch di parent
    } else {
      toast.error('Gagal menghapus kandidat');
    }
  };

  const urls = candidates.map((c) => c.screenUrl);

  return (
    <div>
      <div className='flex justify-between items-center mb-3'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
          List Anggota
        </h4>
        <CopyAllButton urls={urls} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Anggota</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pesan</TableHead>
            <TableHead>URL Screen</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.status}</TableCell>
              <TableCell>{c.message}</TableCell>
              <TableCell className='flex justify-between'>
                <a href={c.screenUrl} target='_blank' rel='noopener noreferrer'>
                  {c.screenUrl}
                </a>
                <CopyButton text={c.screenUrl} />
              </TableCell>
              <TableCell className='space-x-2'>
                <Button
                  variant='destructive'
                  onClick={() => handleDeleteCandidate(c.id)}
                >
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
