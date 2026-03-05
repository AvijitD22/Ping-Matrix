import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { normalizeUrl } from "@/lib/url";
import { UptimeChart } from "@/components/UptimeChart";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { log } from "console";

export default async function WebsiteDetailPage({
  params,
}: {
  params: Promise<{ encodedUrl: string }>;
}) {
  const { encodedUrl } = await params;
  console.log("Received encoded URL:", encodedUrl);
  let decodedUrl: string;
  try {
    decodedUrl = decodeURIComponent(encodedUrl);
    console.log("Decoded URL:", decodedUrl);
  } catch {
    log("Failed to decode URL:", encodedUrl);
    notFound();
  }

  const url = normalizeUrl(decodedUrl);

  const website = await prisma.website.findUnique({
    where: { url },
    include: {
      logs: {
        where: {
          checkedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
        orderBy: { checkedAt: "asc" },
        select: {
          checkedAt: true,
          status: true,
          responseTime: true,
          httpStatus: true,
        },
      },
    },
  });

  if (!website) {
    console.log("Website not found for URL:", url);
    notFound();
  }

  const logs = website.logs;

  // Calculations
  const totalChecks = logs.length;
  const upChecks = logs.filter((l) => l.status).length;
  const uptimePercent =
    totalChecks > 0 ? Math.round((upChecks / totalChecks) * 100) : 0;

  const lastCheck = logs[logs.length - 1];
  const lastCheckedMs = lastCheck
    ? Date.now() - lastCheck.checkedAt.getTime()
    : 0;
  const lastCheckedText = lastCheck
    ? `${Math.floor(lastCheckedMs / 60000)}m ${Math.floor((lastCheckedMs % 60000) / 1000)}s ago`
    : "Never";

  const avgResponse =
    totalChecks > 0
      ? Math.round(
          logs.reduce((sum, l) => sum + (l.responseTime || 0), 0) / totalChecks,
        )
      : 0;

  const minResponse =
    totalChecks > 0
      ? Math.min(...logs.map((l) => l.responseTime || Infinity))
      : 0;
  const maxResponse =
    totalChecks > 0 ? Math.max(...logs.map((l) => l.responseTime || 0)) : 0;

  // Uptime bar segments (simple divs)
  const uptimeSegments = logs.map((log) =>
    log.status ? "bg-emerald-500" : "bg-red-600",
  );

  return (
    <div className="min-h-screen mt-[70px]  text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full ${lastCheck?.status ? "bg-emerald-500" : "bg-red-500"}`}
            ></div>
            <h1 className="text-2xl sm:text-3xl font-bold">{website.url}</h1>{" "}
            <Link
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <img src="/external-link.svg" alt="External Link" />
            </Link>
          </div>
          <button className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium transition-colors">
            <Link href={website.url} target="_blank" rel="noopener noreferrer">
              View Website
            </Link>
          </button>
        </div>

        {/* Top 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-3">
              Current status
            </h3>
            <div
              className={`text-4xl font-bold ${lastCheck?.status ? "text-emerald-400" : "text-red-400"}`}
            >
              {lastCheck?.status ? "Operational" : "Outage Detected"}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-3">
              Last check
            </h3>
            <div className="text-3xl font-bold">{lastCheckedText}</div>
            <p className="mt-2 text-gray-500">Checking every 5m</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-3">
              Last 24 hours
            </h3>
            <div className="flex items-end gap-3">
              <div className="flex-1 h-10 bg-gray-800 rounded overflow-hidden">
                <div className="h-full bg-emerald-600 w-full"></div>
              </div>
              <span className="text-3xl font-bold text-emerald-400">100%</span>
            </div>
            <p className="mt-2 text-gray-500">0 incidents, 0m down</p>
          </div>
        </div>

        {/* Uptime bar - last 7 days */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Last 7 days</h2>
            <span className="text-emerald-400 font-bold text-xl">
              {uptimePercent}%
            </span>
          </div>
          <div className="h-10 bg-gray-800 rounded overflow-hidden flex shadow-inner">
            {uptimeSegments.length > 0 ? (
              uptimeSegments.map((cls, i) => (
                <div
                  key={i}
                  className={`flex-1 ${cls} hover:brightness-110 transition-all`}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                No checks yet
              </div>
            )}
          </div>
          <p className="mt-3 text-sm text-gray-500">0 incidents, 0m down</p>
        </div>

        {/* Response time chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">Response time</h2>
            <div className="text-sm text-gray-400">Last 7 days</div>
          </div>

          <UptimeChart logs={logs} type="response" />

          <div className="grid grid-cols-3 gap-6 mt-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-200">
                ~{avgResponse} ms
              </div>
              <div className="text-sm text-gray-500 mt-1">Average</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">
                {minResponse} ms
              </div>
              <div className="text-sm text-gray-500 mt-1">Minimum</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-rose-400">
                {maxResponse} ms
              </div>
              <div className="text-sm text-gray-500 mt-1">Maximum</div>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
