# Bingo Bloom app shell (iOS + Android)

This folder wraps the web game (`../bingo-bloom.html`) in a native app with [Capacitor](https://capacitorjs.com) and adds real-money purchases through [RevenueCat](https://www.revenuecat.com), which talks to the App Store and Google Play for you. The website build is untouched: on the web the shop stays coins-only and the Bloom Shop tab never appears.

## What is in here
- `package.json` · `capacitor.config.json`: the app shell (app id `com.cordelle.bingobloom`, name Bingo Bloom, landscape, purple splash).
- `sync.sh`: builds the website and copies it into `www/` for the app. Run it after every game change.
- `www/app-config.js`: the only file you edit by hand. It holds the two RevenueCat **public** SDK keys.
- `android/`: the Android project (open it in Android Studio).
- `ios/`: created on a Mac with `npx cap add ios` (open it in Xcode).

## One-time setup
1. Install Node.js 20+ (nodejs.org), Android Studio (for Android) and, on a Mac, Xcode (for iOS).
2. In this folder run `npm install`.
3. Create a RevenueCat account, one project "Bingo Bloom", and two apps in it: iOS and Android. Copy each app's **Public SDK key** (`appl_…` and `goog_…`) into `www/app-config.js`. Public keys are safe inside the app; still, paste them yourself and never into a chat.
4. Create the products in App Store Connect and Google Play Console with **exactly** these ids (all consumable):

| Product id | What the player gets | Suggested price |
|---|---|---|
| `bb_starter` | 3,000 coins, 300 tickets, 10 amethysts, a Gold Pack (once per account) | $0.99 |
| `bb_coins_2000` | 2,000 coins | $1.99 |
| `bb_coins_6000` | 6,000 coins | $4.99 |
| `bb_coins_15000` | 15,000 coins | $9.99 |
| `bb_coins_40000` | 40,000 coins | $19.99 |
| `bb_tickets_500` | 500 tickets | $1.99 |
| `bb_tickets_1500` | 1,500 tickets | $4.99 |
| `bb_gems_50` | 50 amethysts | $4.99 |
| `bb_goldpack` | 1 Gold Card Pack | $2.99 |
| `bb_goldpack_3` | 3 Gold Card Packs | $7.99 |

   Prices are set in the stores, not in the game; the game shows whatever the store returns. Then add the same ids as products in RevenueCat (no entitlements needed; everything is consumable).
5. Fill in the support email in `../privacy.html` and `../terms.html` (search for `REPLACE_WITH_SUPPORT_EMAIL`). Both stores require a privacy policy URL: use `https://dawngonzales1.github.io/bingo-game/privacy.html`.

## Build and run
```
cd app
sh sync.sh            # rebuild the web game into www/
npx cap sync          # copy www/ and plugins into the native projects
npx cap open android  # or: npx cap open ios
```
Then press Run in Android Studio or Xcode. For iOS the first time: `npx cap add ios`, then in Xcode set the Team, and under Deployment Info tick only Landscape Left and Landscape Right.

Test purchases with a sandbox tester account (App Store Connect → Users and Access → Sandbox) or a Google Play license tester. Sandbox purchases are free.

## How purchases work in the game
- Inside the app the shop gets a fourth tab, **Bloom Shop**. It lists the products above with live store prices and a green buy button.
- The store sheet opens, the player pays, RevenueCat confirms the receipt, and the game grants the items on the spot with a thank-you pop-up (Gold Packs open straight away).
- Cancelled or failed purchases grant nothing and show a short note. Every purchase is logged in the player's save (`S.iap`).
- Restore Purchases lives in the Bloom Shop and in Settings (it is a store requirement, even though consumables are delivered instantly).

## Store listing checklist
- Age rating: 17+ on iOS and Teen or Mature on Google Play (simulated gambling, no real-money prizes). The game says "no real-money prizes" on the title screen and in the Terms.
- Screenshots: landscape phone and tablet.
- Privacy "nutrition label": name, email (sign-in), purchase history, gameplay content, crash data. No tracking, no ads.
- Keep the Firebase web config public (it is meant to be); keep every secret key out of the repo and out of chat.
