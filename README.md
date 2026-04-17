# 💥 ASTRO BONK BOMBS

> A cosmic runner where Bombița sprints through 10 themed worlds, stomping enemies, collecting sparks, and surviving fire waves — all before her fuse burns out.

[![Play](https://img.shields.io/badge/▶%20PLAY-deployed-ff4db8?style=for-the-badge)](https://astro-bonk-bombs.vercel.app)
[![Supabase](https://img.shields.io/badge/backend-Supabase-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/hosting-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## 🎮 Gameplay

**Bombița** is a rolling bomb in deep space. Her fuse is her lifeline — it burns down constantly. Jump, stomp, and collect sparks to keep her alive and travel as far as possible.

### Controls
| Action | Input |
|---|---|
| Jump | Tap / Space |
| Hold for higher jump | Hold tap |
| Double jump | Tap in air |
| Triple jump | Tap again in air |
| Ground pound | Tap after all jumps used (W3+) |
| Glide | Hold tap while falling (W4+) |
| **SMASH** | Swipe down / ↓ key (requires item) |

### Core loop
- **Jump over** obstacles (Crystal Cluster, Plasma Vent, Saw Blade, Space Cactus, Meteor Shards)
- **BONK (stomp)** enemies with green ↓ indicator (Space Grub, Astro Mine, Rocket Alien, UFO Drone)
- **AVOID** the red ⚠ Asteroid Spiny — jump OVER only, never on top
- **Collect sparks** for score + fuse refill + meta currency
- **Survive** Fire Wave boss events at W5+

---

## 🌌 10 Worlds

| World | Theme | Unlocks |
|-------|-------|---------|
| 1 | Cosmic Dawn 🌌 | Basics (Jump, Shield, Coin) |
| 2 | Frostfall ❄️ | Plasma Vent, Ice, Gem, Magnet |
| 3 | Lava Core 🔥 | Saw, Rocket Alien, Ground Pound, Fever |
| 4 | Toxic Bloom ☢️ | UFO, Slow-Mo, Glide, Coin Rush |
| 5 | The Void ⚫ | Asteroid Spiny, Bounce Pad, **Fire Wave Boss** |
| 6 | Solar Flare ☀️ | All unlocked, difficulty scales |
| 7 | Neon Nexus ⚡ | — |
| 8 | Abyss Tide 🌊 | — |
| 9 | Ruby Depths 💎 | — |
| 10 | Golden Apex 👑 | Endgame, stays forever |

---

## ✨ Systems

- **Triple jump** + **Ground pound** + **Glide** + **Smash swipe** — 4-tier aerial skill ceiling
- **Combo system** with milestone rewards (x5, x10 = fuse refills)
- **Near-Miss combo stacking** — reward clean dodges
- **Chain stomps** — bonus for multiple stomps in one air phase
- **Stomp Fever mode** — invincible + 2x sparks for 5s
- **Coin Rush event** — timed spark shower
- **Mystery Box** — rare jackpot encounter
- **Welcome Super-Sparkle** — W1 new-player gift
- **Revive with gems** — continue after boom
- **6 Power-ups**: Shield (3-charge w/ AOE shatter), Magnet, Rocket, x2 Coins, Slow-Mo, Smash
- **10 Worlds** — unique palettes, nebulas, planets, difficulty
- **5 Skins** — Classic, Neon Pulse, Shadow Ninja, Frostbite, Retro Arcade
- **4 Persistent Upgrades** — Fuse Reserve, Shield Plating, Magnet Coil, Slow Burn
- **In-run Achievements** — Sprinter, Marathoner, Spark Hoarder, Stomp Master, Perfect Combo, Explorer
- **Full tutorial system** — progressive intros with 3 practice spawns each

---

## 🏗 Architecture

```
astro-bonk-bombs/
├── index.html          # Single-file game (HTML + CSS + JS Canvas)
├── api/
│   └── supabase.js     # Client helper (score submission, leaderboard)
├── schema.sql          # Supabase schema (leaderboard + player_stats + daily_missions)
├── vercel.json         # Vercel config
├── README.md
└── LICENSE
```

## 🔌 Backend (Supabase)

Project: `astro-bonk-bombs`
URL: `https://vvyzlyxxhwnyasgoaxlq.supabase.co`

### Tables
- **`leaderboard`** — every completed run (public read + insert)
- **`player_stats`** — per-player aggregates (upsert by name)
- **`daily_missions`** — rotating daily objectives

All tables have Row-Level Security (RLS) enabled with public-read and insert-only policies suitable for anonymous players.

### Environment variables
Set these in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL` — `https://vvyzlyxxhwnyasgoaxlq.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — (publishable key)

---

## 🚀 Deploy

This is a static single-page game — Vercel auto-deploys via git push.

```bash
git clone https://github.com/YOUR_USER/astro-bonk-bombs
cd astro-bonk-bombs
vercel --prod
```

---

## 📜 License

MIT — see [LICENSE](LICENSE)

---

*Built as a Unity-Android prototype concept preview. Runs in any modern browser.*
