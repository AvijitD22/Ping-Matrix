import { prisma } from './prisma'

export async function calculateUptime(websiteId: string, hours: number) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000)

  const logs = await prisma.uptimeLog.findMany({
    where: { websiteId, checkedAt: { gte: since } },
    select: { status: true, responseTime: true },
  })

  if (logs.length === 0) {
    return { uptime: 0, avgResponseTime: 0, totalChecks: 0 }
  }

  const successful = logs.filter(l => l.status).length
  const uptime = Math.round((successful / logs.length) * 100)
  const avgResponseTime = Math.round(
    logs.reduce((sum, l) => sum + (l.responseTime || 0), 0) / logs.length
  )

  return { uptime, avgResponseTime, totalChecks: logs.length }
}