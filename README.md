# Neocloud Indonesia
Platform cloud hosting modern (Next.js + Express + Prisma + Socket.IO) dengan alur order, konfirmasi admin, aktivasi produk, statistik realtime, monitoring region realtime, dan panel action log realtime.

## Yang sudah diimplementasikan
- Monorepo `apps/backend` + `apps/frontend`.
- Auth JWT + role admin/user + rate limiter + helmet.
- Public stats dari database + seed analytics awal.
- Realtime Socket.IO event: stats, region ping, panel action log.
- Cron scheduler 24 jam (interval 2 menit) update latency/region + history ping.
- Catalog API: products, providers, regions.
- Order API + admin confirm + admin activate server instance.
- Panel API untuk action server: Start/Restart/Shutdown/Kill/Rebuild/Reinstall OS/Rescue Mode.
- Halaman frontend: landing, dashboard, produk flow, panel terminal log, admin monitoring region, legal pages.

## Setup cepat
1. `npm install`
2. Buat `apps/backend/.env`
   - `DATABASE_URL=postgresql://user:pass@localhost:5432/neocloud`
   - `JWT_SECRET=super-secret`
   - `PORT=8080`
3. Generate prisma client:
   - `npx prisma generate --schema apps/backend/prisma/schema.prisma`
4. Migrasi database:
   - `npx prisma migrate dev --schema apps/backend/prisma/schema.prisma`
5. Seed data:
   - `npm run seed`
6. Run development:
   - `npm run dev`

## Akun admin seed
- email: `admin@neocloud.id`
- password: `Admin#Neocloud2026`

## Deploy VPS
- Backend: PM2 (`pm2 start apps/backend/src/server.js --name neocloud-api`)
- Frontend: `next build` + `next start`
- Gunakan Nginx reverse proxy + SSL.

## Catatan
Project ini sudah jauh lebih lengkap dari scaffold awal dan siap dijadikan baseline production. Untuk produksi penuh enterprise, lanjutkan integrasi payment gateway live, provider API real provisioning, storage object untuk upload logo, dan observability stack (Sentry/Prometheus/Grafana).
