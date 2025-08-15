'use client'; // ini WAJIB paling atas

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminFormPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Lolos');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/candidates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, status, message }),
    });

    if (res.ok) {
      alert('Data berhasil disimpan');
      router.push('/admin');
    } else {
      alert('Gagal menyimpan data');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h1>Tambah Kandidat</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Nama Calon Anggota'
        required
      />
      <br />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value='Lolos'>Lolos</option>
        <option value='Tidak'>Tidak</option>
      </select>
      <br />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Pesan'
      />
      <br />
      <button type='submit'>Simpan</button>
    </form>
  );
}
