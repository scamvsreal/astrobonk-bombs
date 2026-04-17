# 🤖 Build & Run pe Android

Ai nevoie de **Android Studio** instalat (free). Îl iei de aici: https://developer.android.com/studio

## 🔧 Setup prima dată (30 min)

### 1. Instalează Android Studio
- Descarcă + instalează cu setări default
- Prima pornire: va descărca automat Android SDK (~3 GB)

### 2. Activează USB Debugging pe telefonul tău Android
- Setări → Despre telefon → apasă de 7 ori pe "Build number"
- Apoi Setări → Developer options → activează **USB debugging**

### 3. Conectează telefonul la PC cu cablu USB
- Pe telefon, aprobă popup-ul "Allow USB debugging"

---

## 🚀 Run pe telefon (repetabil, ~2 min)

### Deschide proiectul în Android Studio

**Opțiunea A** — din terminal:
```cmd
cd %USERPROFILE%\Desktop\astro-bonk-bombs
npx cap open android
```

**Opțiunea B** — manual:
- Deschide Android Studio
- File → Open... → selectează folderul `C:\Users\steli\Desktop\astro-bonk-bombs\android`

### Rulează pe telefon
1. Așteaptă până Android Studio termină "Gradle sync" (5-10 min prima dată, 30s după)
2. În colțul sus-dreapta, în dropdown-ul de device-uri, alege telefonul tău
3. Apasă **▶ Run** (sau `Shift+F10`)
4. Așteaptă build (~1 min prima dată)
5. **Jocul se deschide pe telefon!** 🎮

---

## 🔁 Workflow pentru modificări

Când schimbi jocul (sau când eu îți trimit modificări):

```cmd
cd %USERPROFILE%\Desktop\astro-bonk-bombs
REM Copiază fișierele modificate în www/
REM (sau dacă editezi direct în www/, treci peste)

REM Sync cu Android
npx cap sync android

REM Open sau Run
npx cap run android
```

Android Studio detectează automat modificările și rebuilds.

---

## 📦 Build APK pentru Play Store

Când ești gata să publici:

### Debug APK (pentru testare pe alte telefoane)
```cmd
cd %USERPROFILE%\Desktop\astro-bonk-bombs\android
gradlew.bat assembleDebug
```
APK-ul iese în: `android\app\build\outputs\apk\debug\app-debug.apk`

### Release APK (semnat, pentru Play Store)
1. În Android Studio: **Build → Generate Signed Bundle / APK**
2. Alege **Android App Bundle** (`.aab` — Play Store preferă asta peste APK)
3. **Create new keystore** (PRIMA DATĂ):
   - Path: `C:\Users\steli\Desktop\astrobonkbombs-keystore.jks`
   - Password: ceva puternic (**SALVEAZĂ-L!** — fără el nu poți update app-ul)
   - Alias: `astrobonkbombs`
   - Validity: 25+ years
   - First & last name: numele tău
4. Build type: **release**
5. Next → Finish
6. AAB-ul iese în: `android\app\release\app-release.aab`

### Upload pe Play Store
1. Creează cont Google Play Console: https://play.google.com/console ($25 one-time)
2. Create app → completezi detaliile
3. Production → Create new release → upload `app-release.aab`
4. Așteaptă review Google (1-7 zile prima dată, 1-3h după)

---

## 🎯 Comenzi utile

```cmd
REM Deschide proiectul Android în Android Studio
npx cap open android

REM Rulează pe device-ul conectat (echivalent cu ▶ Run din AS)
npx cap run android

REM Sync doar (când schimbi www/)
npx cap sync android

REM Vezi log-urile de pe telefon
adb logcat | findstr Capacitor
```

---

## 🆘 Troubleshooting

| Problemă | Soluție |
|----------|---------|
| Android Studio nu recunoaște telefonul | Verifică USB debugging activ, schimbă cablul, restart telefon |
| "SDK not found" | Tools → SDK Manager → Install latest SDK Platform |
| Gradle sync failed | File → Invalidate Caches → Invalidate and Restart |
| Build ia mult | Normal prima dată (~10 min). A doua oară mai rapid. |
| App se deschide cu ecran alb | Rulează `npx cap sync android` din nou |
| Haptics nu merg | Check că telefonul are vibrație activată în setări |

---

## 🏗 Structura proiectului

```
astro-bonk-bombs/
├── www/                   ← Jocul (HTML/JS)
│   ├── index.html
│   ├── native.js          ← Bridge Capacitor-JavaScript
│   └── api/supabase.js    ← Leaderboard backend
├── android/               ← Proiect Android Studio
│   └── app/src/main/
│       ├── assets/public/ ← www/ este copiat aici la sync
│       ├── java/com/scamvsreal/astrobonkbombs/
│       ├── res/
│       └── AndroidManifest.xml
├── capacitor.config.json  ← App settings
├── package.json           ← npm deps
└── node_modules/
```

---

*Next step: deschide `astro-bonk-bombs/android` în Android Studio și apasă Run.*
