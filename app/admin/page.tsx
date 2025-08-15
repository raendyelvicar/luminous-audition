import { getCandidates } from '@/app/services/candidates';
import { CandidateWithUrl } from '../types/candidate';
import Link from 'next/link';

export default async function AdminPage() {
  const candidates: CandidateWithUrl[] = await getCandidates();

  return (
    <div style={{ padding: 20 }}>
      <h1>Daftar Kandidat</h1>
      {/* Tombol tambah kandidat */}
      <Link href='/form'>
        <button style={{ marginBottom: '10px' }}>Tambah Kandidat</button>
      </Link>

      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Status</th>
            <th>Pesan</th>
            <th>URL Screen</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.status}</td>
              <td>{c.message}</td>
              <td>
                <a href={c.screenUrl} target='_blank' rel='noopener noreferrer'>
                  {c.screenUrl}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
