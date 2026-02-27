import { prisma } from "./prisma";
// import fetch from 'node-fetch';   // ← comment out if you want to use native fetch

export async function checkSingleWebsite(website: { id: string; url: string }) {
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 5 seconds timeout

    const res = await fetch(website.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    clearTimeout(timeoutId);

    const responseTime = Date.now() - start;
    const status = res.ok; // true = 200-299
    const httpStatus = res.status;

    await prisma.uptimeLog.create({
      data: {
        websiteId: website.id,
        status,
        responseTime,
        httpStatus,
        checkedAt: new Date(),
      },
    });

    console.log(`✓ ${website.url} → ${httpStatus} (${responseTime}ms)`);
  } catch (error: any) {
    const responseTime = Date.now() - start;

    await prisma.uptimeLog.create({
      data: {
        websiteId: website.id,
        status: false,
        responseTime: null, // or keep responseTime if partial
        httpStatus: null,
        checkedAt: new Date(),
      },
    });

    console.log(`✗ ${website.url} → ${error.name || error.message}`);
  }
}
