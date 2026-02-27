import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { normalizeUrl, isInternalUrl } from '@/lib/url'
import { checkRateLimit } from '@/lib/rate-limit'

const schema = z.object({ url: z.string().url().max(500) })

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!checkRateLimit(ip, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { url } = schema.parse(body)

    const normalized = normalizeUrl(url)

    if (isInternalUrl(normalized)) {
      return NextResponse.json({ error: 'Private/internal URLs not allowed' }, { status: 400 })
    }

    // Duplicate check
    const existing = await prisma.website.findUnique({ where: { url: normalized } })
    if (existing) {
      return NextResponse.json({ message: 'Already monitoring', id: existing.id }, { status: 200 })
    }

    const site = await prisma.website.create({ data: { url: normalized } })

    return NextResponse.json({ success: true, id: site.id, url: site.url })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}