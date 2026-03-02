// app/api/last-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';        // ← your prisma client
import { normalizeUrl } from '@/lib/url';    // ← if you have this helper

const RequestSchema = z.object({
  urls: z.array(z.string().url()).min(1).max(100),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { urls } = RequestSchema.parse(body);

    // Optional: normalize all urls the same way you do when adding websites
    const normalizedUrls = urls.map(url => normalizeUrl ? normalizeUrl(url) : url.trim());

    // Find websites by url (using the unique url field)
    const websites = await prisma.website.findMany({
      where: {
        url: { in: normalizedUrls },
      },
      select: {
        id: true,
        url: true,
        logs: {
          orderBy: { checkedAt: 'desc' },
          take: 1,
          select: {
            status: true,
            httpStatus: true,
            responseTime: true,
            checkedAt: true,
          },
        },
      },
    });

    // Build lookup map: url → latest log
    const urlToWebsite = new Map(
      websites.map(w => [w.url, w])
    );

    // Prepare response in input order
    const results = normalizedUrls.map(normalized => {
      const site = urlToWebsite.get(normalized);
      if (!site) {
        return {
          url: normalized,  // or original url if you prefer
          found: false,
        };
      }

      const lastLog = site.logs[0];

      return {
        url: site.url,
        found: true,
        lastStatus: lastLog?.status ?? null,
        httpStatus: lastLog?.httpStatus ?? null,
        responseTimeMs: lastLog?.responseTime ?? null,
        checkedAt: lastLog?.checkedAt.toISOString() ?? null,
        websiteId: site.id,
      };
    });

    return NextResponse.json({ results });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: err.issues },
        { status: 400 }
      );
    }

    console.error('last-status error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}