import '@/lib/server-init';

export async function GET() {
  return new Response('OK', { status: 200 });
}