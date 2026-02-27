import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import '@/lib/server-init';

export async function GET() {
  const sites = await prisma.website.findMany({
    select: {
      id: true,
      url: true,
      createdAt: true,
      logs: {
        orderBy: { checkedAt: 'desc' },
        take: 1,
        select: { status: true, responseTime: true, checkedAt: true, httpStatus: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50, // enough for MVP
  })

  const result = sites.map(site => ({
    id: site.id,
    url: site.url,
    createdAt: site.createdAt,
    lastStatus: site.logs[0]?.status ?? null,
    lastResponseTime: site.logs[0]?.responseTime ?? null,
    lastChecked: site.logs[0]?.checkedAt ?? null,
  }))

  return NextResponse.json(result)
}