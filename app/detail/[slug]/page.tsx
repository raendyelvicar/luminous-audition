import { getCandidateBySlug } from '@/app/services/candidates';

export default async function DetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const candidate = await getCandidateBySlug(params.slug);

  return (
    <div style={{ padding: 20 }}>
      <p>Dear {candidate.name},</p>
      {candidate.status === 'Lolos' ? (
        <>
          <h2>SELAMAT KAMU LOLOS TAHAP AUDISI LUMINOUS CREW</h2>
          <p>{candidate.message}</p>
        </>
      ) : (
        <>
          <h2>TERIMA KASIH SUDAH MENGIKUTI AUDISI</h2>
          <p>{candidate.message}</p>
        </>
      )}
    </div>
  );
}
