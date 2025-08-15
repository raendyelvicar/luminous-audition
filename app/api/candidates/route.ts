import { CandidateWithUrl } from '@/app/types/candidates';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const candidates = await prisma.candidate.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const candidatesWithUrl: CandidateWithUrl[] = candidates.map((c) => ({
    ...c,
    screenUrl: `${baseUrl}?for=${encodeURIComponent(c.name)}`,
  }));

  return Response.json(candidatesWithUrl);
}

export async function POST(request: Request) {
  const { name, status, message } = await request.json();

  if (!name || !status) {
    return new Response(
      JSON.stringify({ error: 'Name and status are required' }),
      { status: 400 }
    );
  }

  const candidate = await prisma.candidate.create({
    data: { name, status, message },
  });

  return Response.json(candidate, { status: 201 });
}
