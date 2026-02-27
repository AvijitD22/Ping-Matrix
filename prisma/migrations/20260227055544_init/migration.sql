-- CreateTable
CREATE TABLE "websites" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "websites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uptime_logs" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "responseTime" INTEGER,
    "httpStatus" INTEGER,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "uptime_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "websites_url_key" ON "websites"("url");

-- CreateIndex
CREATE INDEX "uptime_logs_websiteId_idx" ON "uptime_logs"("websiteId");

-- CreateIndex
CREATE INDEX "uptime_logs_websiteId_checkedAt_idx" ON "uptime_logs"("websiteId", "checkedAt");

-- AddForeignKey
ALTER TABLE "uptime_logs" ADD CONSTRAINT "uptime_logs_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
