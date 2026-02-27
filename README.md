# 🟢 Ping Matrix

A lightweight, developer-friendly website uptime monitoring system.

Ping Matrix continuously monitors websites, records response times, tracks uptime percentages, and provides time-series logs, all built with a modern TypeScript stack.

## ✨ Why Ping Matrix?

- ⚡ Lightweight & fast
- 🧠 Clean architecture
- 📊 Chart-ready log APIs
- 🔁 Automated health checks
- 🛠 Built with modern tooling
- 📦 Easy to self-host

Perfect for learning system design, monitoring architecture, and backend performance patterns.

## 🚀 Features

- Add and monitor multiple websites
- Automatic health checks (every 20 seconds)
- Parallel request control (concurrency limited)
- Response time tracking
- 24-hour & 7-day uptime calculation
- Average response time metrics
- REST APIs for log visualization
- Indexed queries for performance

## 🏗 Tech Stack

- Next.js 16 (App Router)
- Prisma v7
- PostgreSQL
- node-cron
- p-limit
- TypeScript

## 📸 What It Does

Ping Matrix:
1. Registers a website  
2. Runs scheduled health checks  
3. Stores status + response time  
4. Computes uptime dynamically  
5. Exposes chart-ready API endpoints  

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/AvijitD22/Ping-Matrix.git
cd ping-matrix
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres"
```

### 4️⃣ Run Database Migrations

```bash
npx prisma migrate dev
```

### 5️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 6️⃣ Start Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 🔄 How Monitoring Works

* Cron runs every 20 seconds
* Fetch request with timeout handling
* Concurrency limited to 5 parallel checks
* Results stored in `UptimeLog`
* API calculates uptime metrics dynamically

---

## 📡 API Endpoints

### ➕ Add Website

```
POST /api/add-website
```

### 📄 Get Website Details

```
GET /api/website/:id
```

Returns:

* Current status
* Latest response time
* 24h uptime
* 7d uptime
* Average response time
* Total checks

### 📊 Get Logs (Chart Ready)

```
GET /api/website/:id/logs?hours=24
```

---

## 📈 Performance Considerations

Recommended Prisma index:

```prisma
@@index([websiteId, checkedAt])
```

Ensures efficient time-range queries as logs grow.

---

## 🚀 Production Notes

For production:

* Use a dedicated PostgreSQL instance
* Run monitoring in a separate worker process
* Avoid serverless-only environments
* Use environment-based configuration
* Consider Redis queue for large-scale monitoring

---

## 🧩 Roadmap

* Email / Slack alerts
* Multi-location monitoring
* Public status page
* Incident tracking
* Authentication & user accounts
* SLA reporting

---

## 📄 License

MIT License

---

### ⭐ If you find this useful, consider giving it a star!

