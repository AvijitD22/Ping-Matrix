// src/lib/server-init.ts
import { startUptimeChecker } from './cron-checker';

declare global {
  var __cron_started: boolean | undefined;
}

// This only runs once when the server starts (in dev it restarts often)
if (process.env.NODE_ENV !== 'production' || !globalThis.__cron_started) {
  startUptimeChecker();
  if (process.env.NODE_ENV !== 'production') {
    globalThis.__cron_started = true;
  }
}