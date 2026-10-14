#!/bin/sh
# Builds the stand-alone web version for GitHub Pages from bingo-bloom.html:
#   game.html  - the game as a normal web page
#   index.html - a frame around it that shows the game sideways when a phone is held upright,
#                so it works even with rotation lock on (iPhones cannot be forced sideways)
cd "$(dirname "$0")"
# Stop before publishing a game whose script will not run
if command -v node >/dev/null 2>&1; then
  node -e "const s=require('fs').readFileSync('bingo-bloom.html','utf8');for(const m of s.matchAll(/<script>([\\s\\S]*?)<\\/script>/g)){try{new (require('vm').Script)(m[1])}catch(e){console.error('Script error in bingo-bloom.html: '+e.message);process.exit(1)}}" || exit 1
fi
HEAD='<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#2a0c46"><link rel="manifest" href="manifest.webmanifest"><link rel="apple-touch-icon" href="art/app-icon-192.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="Bingo Bloom">'
LIBS='<script src="lib/firebase-app-compat.js"></script><script src="lib/firebase-auth-compat.js"></script><script src="lib/firebase-firestore-compat.js"></script><script src="firebase-config.js"></script>'
{ printf '<!doctype html>\n<html lang="en"><head>%s<style>html,body{height:100%%;margin:0}</style>%s</head><body>\n' "$HEAD" "$LIBS"; cat bingo-bloom.html; printf '\n</body></html>\n'; } > game.html
cat > index.html <<HTML
<!doctype html>
<html lang="en"><head>$HEAD<title>Bingo Bloom</title>
<style>
html,body{margin:0;height:100%;overflow:hidden;background:#2a0c46}
#g{position:fixed;top:0;left:0;border:0;display:block;width:100vw;height:100vh;width:100dvw;height:100dvh;background:#2a0c46}
@media (orientation:portrait) and (pointer:coarse){
  #g{width:100vh;height:100vw;width:100dvh;height:100dvw;transform-origin:top left;transform:rotate(90deg) translateY(-100%)}
}
</style></head><body>
<iframe id="g" src="game.html" title="Bingo Bloom" allow="fullscreen; autoplay; screen-wake-lock"></iframe>
</body></html>
HTML
