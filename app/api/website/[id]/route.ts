import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateUptime } from "@/lib/uptime";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  console.log("Fetching details for website ID:", id);

  const site = await prisma.website.findUnique({
    where: { id },
    include: {
      logs: {
        orderBy: { checkedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stats24h = await calculateUptime(site.id, 24);
  const stats7d = await calculateUptime(site.id, 168);

  return NextResponse.json({
    id: site.id,
    url: site.url,
    createdAt: site.createdAt,
    currentStatus: site.logs[0]?.status ?? null,
    currentResponseTime: site.logs[0]?.responseTime ?? null,
    uptime24h: stats24h.uptime,
    uptime7d: stats7d.uptime,
    avgResponse24h: stats24h.avgResponseTime,
    totalChecks24h: stats24h.totalChecks,
  });
}