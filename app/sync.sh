#!/bin/sh
# Copies the web game into app/www so Capacitor can wrap it. Run from the app folder: sh sync.sh
cd "$(dirname "$0")"
sh ../build-site.sh || exit 1
rm -rf www/art www/lib
mkdir -p www
cp -R ../art www/art
cp -R ../lib www/lib
cp ../firebase-config.js ../manifest.webmanifest ../privacy.html ../terms.html www/
# the app loads the game page directly (no rotation frame: the app itself is locked to landscape) plus the app-only config
sed 's#<script src="firebase-config.js"></script>#<script src="firebase-config.js"></script><script src="app-config.js"></script>#' ../game.html > www/index.html
echo "www is ready"
