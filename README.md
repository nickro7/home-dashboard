# Homeboard V3 — iPad Air 1 (iOS 12)

Version 3 of your iPad wall dashboard. It remains a single self-contained HTML file with no always-on server in your home.

## What's changed

- **Home:** Time and current weather in **Faxinal do Soturno, Rio Grande do Sul** are now in their own compact tile on the same Home screen as Aarhus. Brazil has no additional hourly or daily forecast screen.
- **Aarhus hourly:** The **next 24 hours** remain swipeable (and can be navigated with the ‹ › buttons), but the **visible horizontal scrollbar is hidden**.
- **Music:** **28 built-in internet radio presets** grouped as Rock & Metal, Blues & Soul, Jazz, Brazilian, and Chill & More, plus search and a ★ favourites list saved on this iPad. Your own local audio files and custom direct HTTPS stream URL input still work.
- **Calendar:** Preserved local iCloud `.ics` import, manually added appointments, and optional protected calendar bridge.
- **Xiaomi sensor:** Still a placeholder for a later ESP32 phase.

## Installation

To upgrade V2: replace `index.html` on **the same existing hosted site** and reload the dashboard in iPad Safari. Your saved calendar and weather location normally remain in that browser as long as the hostname and Safari website data stay the same. If Safari displays old code, fully reload or clear the specific site's cache. Only `index.html` needs publishing; `calendar-worker.js` is an optional separate Cloudflare Worker (never upload calendar exports or private tokens to a public repo).

If not hosted yet: for an always-on iPad with no other device running at home, publish `index.html` using a free static site host (GitHub Pages or Cloudflare Pages) and add its HTTPS URL to the Home Screen via Safari. On the iPad, use low brightness and Settings → Display & Brightness → Auto-Lock → Never where available; inspect battery health and use safe, ventilated charging.

## Radio notes

Radio streams are direct HTTPS MP3/AAC audio, with native HLS streams for some Brazilian stations, selected for compatibility with older iOS Safari. HLS streams may not play in Windows Chrome. The mini-player previous/next buttons change radio stations while listening to a preset, or step through your selected local files. Press a station once to begin playback; iOS prevents autoplay without a tap. Music controls stay at the bottom when you return to Home. Radio broadcasters may change stream URLs, cap listeners, or geo-block streams; not every station can be guaranteed to play. Preset streams are for personal listening, not redistribution. Tap ☆/★ next to stations to manage Favorites. In the music category filters, choose ★ Favorites for the subset you like.

Brazilian stations include **Bossa Beyond** (bossa, samba), **Rádio Cidade** (rock/pop from Rio), **Rádio Gaúcha** (Rio Grande do Sul news/sports), and **BH FM** (Belo Horizonte hits). The latter three use third-party broadcaster stream URLs that may change or be geographically restricted, so test these directly on the iPad. The **Blues Radio** stream is from Athens, Greece.

Stream references:
- [SomaFM channels](https://somafm.com/listen/) and [Bossa Beyond direct stream](https://somafm.com/bossa/directstreamlinks.html)
- [Jazz24 MP3 128k](https://www.jazz24.org/ways-to-listen/)
- [Antenne 1 Classic and Modern Rock](https://streams.antenne1.de/)
- [Blues Radio Athens](https://e-radio.github.io/stations/blues-radio/)
- [Radio Paradise direct streams](https://beta.radioparadise.com/rp3.php?file=links&name=Listen)
- [Rádio Cidade player](https://radiocidade.fm/player/index.php), [Rádio Gaúcha](https://www.gruporbs.com.br/nossas-marcas/6/gaucha), [BH FM broadcaster feed listing](https://github.com/yunusdgntr/radio-online-json-url/blob/master/Brazil.json)

## Notes on weather, privacy and performance

- Live weather uses [Open-Meteo](https://open-meteo.com/) and refreshes roughly every 15 minutes. Aarhus retains the next five days and the hourly forecast. The Brazil tile requests **only the current conditions** and uses `America/Sao_Paulo` (UTC−3, in 2026) for local clock time.
- Local `.ics` imports are **snapshots**, not iCloud automatic synchronization. The optional Cloudflare Worker bridge uses a token and requires an iCloud *Public Calendar* URL. Anyone with that calendar URL can read it; use a dedicated restricted-content calendar if you choose this later. Never put an Apple ID password into this project.
- File playback from Files does **not** upload songs and requires reselecting files after refreshing the dashboard. Streams need internet. No music is included in the zip.
- Built for **iPad Air 1, iOS 12 Safari, 1024 × 768 landscape** with no external JavaScript libraries. Test streaming and live weather on the tablet; desktop preview cannot prove iOS 12 playback.

Files: `index.html`, `calendar-worker.js` (optional), `README.md`.
