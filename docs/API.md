# API Documentation
- `GET /api/analytics/public-stats` statistik publik realtime.
- `POST /api/auth/register` registrasi user.
- `POST /api/auth/login` login JWT.
- `POST /api/orders` buat order (auth).
- `POST /api/admin/orders/:id/confirm` konfirmasi order (admin).
- `POST /api/admin/orders/:id/activate` aktivasi produk (admin).

## Socket Events
- `public_stats_updated`
- `order_created`
- `payment_received`
- `product_activated`
