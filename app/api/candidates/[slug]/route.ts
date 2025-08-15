import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const name = params.slug.replace(/-/g, ' ');

  const candidate = await prisma.candidate.findFirst({
    where: { name },
  });

  if (!candidate) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
    });
  }

  return Response.json(candidate);
}
