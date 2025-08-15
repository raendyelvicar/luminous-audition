import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // ✅ harus di-`await`
  const name = slug.replace(/-/g, ' ');

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
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> } // id tetap string
) {
  const { slug } = await params; // ✅ harus di-`await`
  const body = await request.json();
  const { name, status, message } = body;

  const candidate = await prisma.candidate.update({
    where: { id: Number(slug) },
    data: { name, status, message },
  });

  return Response.json(candidate);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> } // <-- slug adalah promise
) {
  const { slug } = await params; // ✅ harus di-`await`

  if (!slug) {
    return new Response(JSON.stringify({ error: 'ID missing' }), {
      status: 400,
    });
  }

  try {
    const response = await prisma.candidate.delete({
      where: { id: Number(slug) },
    });
    return Response.json(response);
  } catch {
    return new Response(JSON.stringify({ error: 'Delete failed' }), {
      status: 500,
    });
  }
}
