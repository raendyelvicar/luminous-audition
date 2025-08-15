import { PrismaClient } from '@prisma/client';
import CandidateDetailClient from './CandidateDetailClient';

const prisma = new PrismaClient();

export default async function CandidateDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const name = params.slug.replace(/-/g, ' ');

  const candidate = await prisma.candidate.findFirst({
    where: { name },
  });

  if (!candidate) {
    return <p style={{ padding: 20 }}>Data tidak ditemukan</p>;
  }

  return <CandidateDetailClient candidate={candidate} />;
}
