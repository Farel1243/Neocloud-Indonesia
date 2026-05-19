# Neocloud Indonesia
Platform cloud hosting modern (Next.js + Express + Prisma + Socket.IO).

## Fitur utama
- Landing page dark navy premium + realtime public stats dari backend.
- Auth JWT, role user/admin, rate limiter, helmet.
- Sistem order, konfirmasi admin, aktivasi produk.
- Seed analytics awal dari database (bukan hardcode frontend).
- Scheduler cron 24 jam (broadcast stats).
- Struktur siap pengembangan: provider, region ping, monitoring, reseller, livechat, legal pages.

## Struktur
- `apps/frontend`: Next.js + Tailwind + Framer Motion + Recharts ready.
- `apps/backend`: Express + Socket.IO + Prisma + Cron.
- `docs/API.md`: endpoint dan socket event.

## Instalasi
1. `npm install`
2. Setup env backend `apps/backend/.env`:
   - `DATABASE_URL=postgresql://user:pass@localhost:5432/neocloud`
   - `JWT_SECRET=super-secret`
   - `PORT=8080`
3. Jalankan migrasi: `npx prisma migrate dev --schema apps/backend/prisma/schema.prisma`
4. Seed awal: `npm run seed`
5. Jalankan dev: `npm run dev`

## Deploy VPS
1. Build: `npm run build`
2. Jalankan backend via PM2: `pm2 start apps/backend/src/server.js --name neocloud-api`
3. Jalankan frontend: `npm --workspace apps/frontend run build && npm --workspace apps/frontend exec next start -p 3000`
4. Reverse proxy Nginx untuk domain + SSL.

## Buat admin pertama
- Seed sudah membuat admin default:
  - email: `admin@neocloud.id`
  - password: `Admin#Neocloud2026`
- Ganti password segera setelah login.

## Scheduler & websocket
- Scheduler aktif otomatis dari `runSchedulers()` saat backend startup.
- Socket.IO aktif di server yang sama, event stats/order/payment/activation realtime.

## Integrasi monitoring real
- Hubungkan agent monitoring/provider API ke tabel `server_instances`, `ping_history`, `server_actions`.
- Emit update via Socket.IO untuk dashboard user/admin.
