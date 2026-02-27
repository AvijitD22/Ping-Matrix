import cron from "node-cron";
import { prisma } from "./prisma";
import { checkSingleWebsite } from "./check-website";
import pLimit from "p-limit";
const limit = pLimit(5); // max 5 parallel requests

// We will run this function once when the server starts
export function startUptimeChecker() {
  console.log("Scheduling cron...");

  // Run once right now (for debugging)
  console.log("[IMMEDIATE DEBUG RUN] Checking websites now...");
  checkAllWebsites(); // ← you'll need to extract this

  // Then schedule normal run
  cron.schedule("*/20 * * * * *", async () => {
    console.log(`[CRON ${new Date().toISOString()}] Starting...`);
    await checkAllWebsites();
  });

  console.log("Cron scheduled");
}

// Extract the logic so we can call it twice
async function checkAllWebsites() {
  try {
    const websites = await prisma.website.findMany({
      select: { id: true, url: true },
    });
    if (websites.length === 0) {
      console.log("No websites → nothing to check");
      return;
    }
    console.log(`Checking ${websites.length} sites...`);
    await Promise.all(
      websites.map((site) => limit(() => checkSingleWebsite(site))),
    );
    console.log("Check round finished");
  } catch (err) {
    console.error("Check failed:", err);
  }
}
