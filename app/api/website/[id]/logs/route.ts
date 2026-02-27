import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { searchParams } = new URL(req.url);
  const hours = parseInt(searchParams.get("hours") || "24");

  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  const logs = await prisma.uptimeLog.findMany({
    where: {
      websiteId: id,
      checkedAt: { gte: since },
    },
    select: {
      checkedAt: true,
      status: true,
      responseTime: true,
      httpStatus: true,
    },
    orderBy: { checkedAt: "asc" }, // perfect for charts
  });

  return NextResponse.json(logs);
}