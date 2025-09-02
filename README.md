# NextAuth + Auth0 + Next.js 14 (App Router)

[🇹🇷 Türkçe için aşağı kaydırın / Scroll down for Turkish version](#türkçe)

---

Production-ready OAuth + JWT session auth with role-based authorization using NextAuth (Auth0 provider), Next.js middleware, and TypeScript.

## Features

- 🔑 OAuth login with Auth0 (`Auth0` provider)
- 🔄 JWT sessions with automatic access token refresh (via refresh token)
- 🛡️ Role-based authorization (admin, user)
- 🔒 Next.js middleware route protection and redirects
- 🎨 TailwindCSS UI with protected dashboards
- ⚠️ Error and Unauthorized pages
- ⚙️ 12-Factor config via environment variables
- 🐳 Optional Docker build and run

## Tech Stack

- ⚛️ Next.js 14 App Router
- 🔑 next-auth v5 (beta)
- 🌐 Auth0
- 🟦 TypeScript
- 🎨 TailwindCSS v4

## Project Structure

```
.
├── app/
│   ├── (auth)/login/         # Authentication pages
│   ├── (public)/             # Public pages (home, about)
│   ├── dashboard/            # Protected dashboards
│   │   ├── admin/            # Admin dashboard
│   │   └── user/             # User dashboard
│   ├── api/auth/[...nextauth] # Auth API routes
│   └── error                 # Error pages
├── components/               # Reusable UI components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
├── middleware.ts             # Route protection
└── auth.ts                   # Auth configuration
```

## Prerequisites

- Node.js 18+
- Auth0 tenant (Regular Web App recommended)
- GitHub repository

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Copy `.env.example` to `.env.local` and update with your Auth0 credentials
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Auth0 Setup

1. Create a new Application in Auth0 (Regular Web App)
2. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback/auth0`
   - **Allowed Logout URLs**: `http://localhost:3000/`
   - **Allowed Web Origins**: `http://localhost:3000`
3. Enable Refresh Tokens in Auth0:
   - Go to Settings → Advanced → Grant Types
   - Enable "Refresh Token (Allow Offline Access)"
   - Enable Refresh Token Rotation

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fnext-auth&env=AUTH0_CLIENT_ID,AUTH0_CLIENT_SECRET,AUTH0_ISSUER,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=Required%20environment%20variables%20for%20NextAuth%20with%20Auth0&project-name=next-auth-app&repository-name=next-auth-app)

### Docker

Build and run with Docker:

```bash
docker build -t next-auth .
docker run -p 3000:3000 next-auth
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't switch accounts | Set `prompt: 'login'` in `auth.ts` |
| No refresh token | Enable "Allow Offline Access" in Auth0 |
| Admin role not working | Verify role claim in ID token |
| 401 errors | Check refresh token configuration |

## License

MIT

---

# Türkçe

Next.js 14 (App Router) ile NextAuth ve Auth0 kullanarak geliştirilmiş, rol tabanlı yetkilendirmeye sahip OAuth + JWT oturum yönetimi uygulaması.

## Özellikler

- 🔑 Auth0 ile OAuth girişi
- 🔄 Otomatik token yenileme özelliği
- 🛡️ Rol tabanlı yetkilendirme (yönetici, kullanıcı)
- 🔒 Next.js middleware ile rota koruması
- 🎨 TailwindCSS ile modern kullanıcı arayüzü
- ⚠️ Hata ve Yetkisiz Erişim sayfaları
- ⚙️ Ortam değişkenleri ile yapılandırma
- 🐳 Docker desteği

## Teknoloji Yığını

- ⚛️ Next.js 14 App Router
- 🔑 next-auth v5 (beta)
- 🌐 Auth0
- 🟦 TypeScript
- 🎨 TailwindCSS v4

## Proje Yapısı

```
.
├── app/
│   ├── (auth)/login/         # Giriş sayfaları
│   ├── (public)/             # Herkese açık sayfalar (ana sayfa, hakkında)
│   ├── dashboard/            # Korumalı panolar
│   │   ├── admin/            # Yönetici paneli
│   │   └── user/             # Kullanıcı paneli
│   ├── api/auth/[...nextauth] # Kimlik doğrulama API yolları
│   └── error                 # Hata sayfaları
├── components/               # Tekrar kullanılabilir UI bileşenleri
├── hooks/                    # Özel React hook'ları
├── lib/                      # Yardımcı fonksiyonlar
├── middleware.ts             # Rota koruması
└── auth.ts                   # Kimlik doğrulama yapılandırması
```

## Ön Gereksinimler

- Node.js 18+
- Auth0 hesabı (Regular Web App önerilir)
- GitHub deposu

## Hızlı Başlangıç

1. Depoyu klonlayın
2. Bağımlılıkları yükleyin:
   ```bash
   npm ci
   ```
3. `.env.example` dosyasını `.env.local` olarak kopyalayın ve Auth0 bilgilerinizle güncelleyin
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
5. [http://localhost:3000](http://localhost:3000) adresini açın

## Kullanılabilir Komutlar

- `npm run dev` - Geliştirme sunucusunu başlat
- `npm run build` - Üretim için derle
- `npm start` - Üretim sunucusunu başlat
- `npm run lint` - Kod kalitesi kontrolü
- `npm run typecheck` - TypeScript tip kontrolü

## Auth0 Kurulumu

1. Auth0'da yeni bir Uygulama oluşturun (Regular Web App)
2. Aşağıdaki ayarları yapılandırın:
   - **İzin Verilen Geri Çağrı URL'leri**: `http://localhost:3000/api/auth/callback/auth0`
   - **İzin Verilen Çıkış URL'leri**: `http://localhost:3000/`
   - **İzin Verilen Web Kökenleri**: `http://localhost:3000`
3. Auth0'da Yenileme Token'larını etkinleştirin:
   - Ayarlar → Gelişmiş → İzin Türleri
   - "Yenileme Token'ı (Çevrimdışı Erişime İzin Ver)" seçeneğini etkinleştirin
   - Token Döndürme özelliğini etkinleştirin

## Dağıtım

### Vercel ile

[![Vercel ile Dağıt](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkullanici-adi%2Fnext-auth&env=AUTH0_CLIENT_ID,AUTH0_CLIENT_SECRET,AUTH0_ISSUER,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=NextAuth%20i%C3%A7in%20gerekli%20ortam%20de%C4%9Fi%C5%9Fkenleri&project-name=next-auth-app&repository-name=next-auth-app)

### Docker ile

Docker ile derleyip çalıştırın:

```bash
docker build -t next-auth .
docker run -p 3000:3000 next-auth
```

## Sorun Giderme

| Sorun | Çözüm |
|-------|--------|
| Hesaplar arası geçiş yapılamıyor | `auth.ts` dosyasında `prompt: 'login'` ayarını yapın |
| Yenileme token'ı alınamıyor | Auth0'da "Çevrimdışı Erişime İzin Ver" seçeneğini etkinleştirin |
| Yönetici rolü çalışmıyor | ID token'ındaki rol talebini kontrol edin |
| 401 hataları | Yenileme tokenı yapılandırmasını kontrol edin |

## Lisans

MIT
