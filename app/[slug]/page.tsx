import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function CandidateDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Unwrap Promise
  const name = slug.replace(/-/g, ' ');

  const candidate = await prisma.candidate.findFirst({
    where: { name },
  });

  if (!candidate) {
    return <p style={{ padding: 20 }}>Data tidak ditemukan</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Pengumuman</h1>
      {candidate.status === 'Lolos' ? (
        <>
          <p>Dear {candidate.name},</p>
          <p>SELAMAT KAMU LOLOS TAHAP AUDISI LUMINOUS CREW</p>
          <p>{candidate.message}</p>
        </>
      ) : (
        <>
          <p>Dear {candidate.name},</p>
          <p>Mohon maaf, kamu belum lolos tahap audisi Luminous Crew</p>
          <p>{candidate.message}</p>
        </>
      )}
    </div>
  );
}
