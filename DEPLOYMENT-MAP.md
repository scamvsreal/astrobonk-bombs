# 🗺 DEPLOYMENT MAP — Astro Bonk Bombs

## 📦 Ce merge unde

```
            ┌─────────────────────────────────────────┐
            │   ASTRO BONK BOMBS — cod sursă unic     │
            │   C:\Users\steli\Desktop\astro-bonk...  │
            └────────────────┬────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
          ┌───────┐     ┌────────┐    ┌──────────┐
          │GITHUB │────▶│ VERCEL │    │ANDROID   │
          │ (git) │     │ (web)  │    │STUDIO→APK│
          └───────┘     └────────┘    └──────────┘
                             │              │
                             ▼              ▼
                        ┌──────────┐   ┌──────────┐
                        │ Supabase │   │Play Store│
                        │ (DB)     │   │ ($)      │
                        └──────────┘   └──────────┘
```

---

## 🐙 GITHUB → `github.com/scamvsreal/astrobonk-bombs`

**Rol**: source of truth. Toate fișierele (mai puțin `node_modules`, `android/build`) stau aici.

**Ce se uploadează** (prin `git push`):
```
✅ www/                    (sursa jocului web)
   ├── index.html
   ├── native.js
   └── api/supabase.js
✅ android/                (proiect Android Studio — minus build artifacts)
✅ capacitor.config.json
✅ package.json
✅ package-lock.json
✅ vercel.json
✅ schema.sql
✅ README.md / LICENSE / .gitignore
✅ BUILD-ANDROID.md

❌ node_modules/           (gitignored — se regenerează cu npm install)
❌ android/app/build/      (build artifacts)
❌ android/.gradle/        (gradle cache)
```

**Cum actualizezi**: `git add -A && git commit -m "..." && git push`

---

## ⚡ VERCEL → `astrobonk-bombs.vercel.app` (sau similar)

**Rol**: jocul live pe web. Orice telefon/browser poate juca aici.

**Cum funcționează**: Vercel e conectat la GitHub. La orice `git push`, Vercel re-deploy automat în ~30s.

**Ce servește**: conținutul din `www/` (configurat prin `vercel.json` rewrites). Rute:
- `/` → `www/index.html`
- `/native.js` → `www/native.js` (detectează că nu e Capacitor, nu face nimic)
- `/api/supabase.js` → `www/api/supabase.js`

**Setup one-time**: https://vercel.com/new → Import `scamvsreal/astrobonk-bombs` → **Other** framework → Deploy.

---

## 🗄 SUPABASE → project `astro-bonk-bombs` (ID: `vvyzlyxxhwnyasgoaxlq`)

**Rol**: backend pentru leaderboard, player stats, daily missions.

**Ce e deja acolo**:
- Tabele: `leaderboard`, `player_stats`, `daily_missions`
- RLS policies (public read + insert)
- URL: `https://vvyzlyxxhwnyasgoaxlq.supabase.co`
- Publishable key: `sb_publishable_aYa5S1rVCN7ofdwnt6dQkw_9Sv5cZrr`

**Ce se uploadează**: NIMIC. Supabase-ul e live și stă acolo. `schema.sql` din repo e doar referință în caz că vrei să recreezi.

**Cum modifici**: prin Supabase dashboard (web UI) sau prin conversație nouă cu mine (am access direct la proiect).

---

## 🤖 ANDROID STUDIO → APK/AAB semnat

**Rol**: transformă `android/` în fișier instalabil pe telefon + upload pe Play Store.

**Ce se uploadează**: NIMIC direct. Folosești **Android Studio** local să generezi:
- **APK** (debug) — pentru test pe telefonul tău
- **AAB** (release semnat) — pentru Play Store

Flow:
1. `npx cap open android` → se deschide Android Studio
2. Gradle sync
3. **Build → Generate Signed Bundle** → `app-release.aab`
4. Upload `.aab` pe Play Console

---

## 🎮 GOOGLE PLAY CONSOLE → `play.google.com/store/apps/...`

**Rol**: magazinul unde utilizatorii descarcă aplicația.

**Cost one-time**: **$25 USD** (fee Google developer).

**Ce se uploadează**:
- `app-release.aab` (generat din Android Studio)
- App icon 512×512 PNG
- Feature graphic 1024×500 PNG
- 2-8 screenshots (phone + optional tablet)
- Short description (80 char)
- Full description (4000 char)
- Privacy policy URL
- Content rating questionnaire
- Target audience + age group
- Trailer video 30s (optional dar recomandat)

**Cum**: https://play.google.com/console

Review Google: 1-7 zile prima dată, apoi 1-3 ore per update.

---

## 💰 ADMOB (când vrei monetizare)

**Rol**: reclame în joc — rewarded video (revive), interstitial (între morți).

**Setup** (când ești gata):
1. Cont pe https://apps.admob.com
2. Adaugi aplicația (linkezi cu Play Console)
3. Creezi Ad Units (ID-uri unice pentru rewarded/interstitial/banner)
4. Instalezi `@capacitor-community/admob` + configurezi în joc
5. Plătești prin AdSense când atingi $100 prag

---

## 🔁 Workflow DE AICI ÎNAINTE

### Scenario A: schimbi ceva la cod (CSS, text, features)
```cmd
cd %USERPROFILE%\Desktop\astro-bonk-bombs
REM Editezi www/index.html sau alte fișiere

REM Sync cu Android dacă vrei să testezi
npx cap sync android

REM Commit și push
git add -A
git commit -m "mesaj"
git push

REM ↓ automat ↓
REM  → Vercel redeploys în 30s (web live)
REM  → Dacă vrei și Android: npx cap open android + ▶ Run
```

### Scenario B: schimbi ceva la DB (schema, tabele)
Vorbești cu mine într-o conversație nouă — eu aplic migrația prin Supabase MCP.

### Scenario C: deploy nou pe Play Store
1. Editezi cod → `git push` → Vercel live
2. `npx cap sync android`
3. Android Studio: Build → Generate Signed Bundle → Release mode → ia `app-release.aab`
4. Play Console → Create new release → upload `.aab` → submit pentru review

---

## 🔑 Variabile & Secrete

**Publice** (pot fi în cod/git — protejate de RLS):
- `SUPABASE_URL`: `https://vvyzlyxxhwnyasgoaxlq.supabase.co`
- `SUPABASE_ANON_KEY`: `sb_publishable_aYa5S1rVCN7ofdwnt6dQkw_9Sv5cZrr`

**Secrete** (NU le pune în git):
- Keystore password Android (`astrobonkbombs-keystore.jks`) — salvează în password manager
- Supabase Service Role Key (dacă vei folosi pentru server-side, încă nu) — `.env.local`
- AdMob App ID + Ad Unit IDs (când setezi) — `.env.local` sau Capacitor config

---

## 📋 Checklist înainte de Play Store

- [ ] Testat pe 2-3 telefoane reale
- [ ] Ad monetization setup (sau fără — alegi modelul)
- [ ] IAP setup dacă e cazul
- [ ] App icon 512×512 finalizat
- [ ] Feature graphic 1024×500
- [ ] 4-8 screenshots gameplay
- [ ] Trailer 30s (optional)
- [ ] Privacy Policy URL (ex: iubenda.com — gratis pentru aplicații mici)
- [ ] Content rating questionnaire completat
- [ ] Cont Play Console plătit ($25)
- [ ] Keystore salvat safe + parolă salvată
- [ ] AAB semnat release generat
- [ ] Submit pentru review

---

## 🎯 Ce trebuie să faci TU acum, în ordine

**Săptămâna 1:**
1. ☑️ **Testează jocul pe telefonul tău** — deschide `BUILD-ANDROID.md`, instalează Android Studio, `npx cap open android`, Run pe device
2. Fixăm bug-uri observate pe device real
3. Generezi app icon (te pot ajuta cu canvas/png)

**Săptămâna 2:**
4. Setup AdMob account (când decizi strategia)
5. Integrare AdMob rewarded video pentru revive
6. Privacy policy URL

**Săptămâna 3:**
7. Cont Play Console ($25)
8. Asseturi: screenshots, feature graphic, descriere
9. Signed release build + upload pe Play Console
10. Submit pentru review

**Săptămâna 4:**
11. 🚀 **LIVE pe Play Store!**

---

## ❓ Ce urmează din partea mea acum?

Spune-mi care e următorul pas:

- **A)** Testezi pe telefon — aștept feedback și fix bug-uri
- **B)** Generez app icon + splash screen custom
- **C)** Integrez AdMob rewarded ads pentru revive
- **D)** Pregătesc assets pentru Play Console (descrieri, screenshots frame)
- **E)** Altceva

Eu aștept următoarea decizie.
