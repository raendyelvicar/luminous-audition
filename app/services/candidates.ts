// services/candidates.ts

export async function getCandidateBySlug(slug: string) {
  const res = await fetch(`/api/candidates/${slug}`);
  if (!res.ok) throw new Error('Kandidat tidak ditemukan');
  return res.json();
}

export async function createCandidate(data: {
  name: string;
  status: 'Lolos' | 'Tidak';
  message: string;
}) {
  const res = await fetch('/api/candidates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Gagal membuat kandidat');
  return res.json();
}

export async function getCandidates() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidates`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('Gagal mengambil data kandidat');
  return res.json();
}
