# Bingo Bloom, by Cordelle

A premium bingo game for phones, played sideways. It has a bright, sunny world with plum-and-gold buttons, so it still feels like the Cordelle team app.
All names, pictures and sounds are original: the pictures are drawn in code and the sounds are made by the phone's own synthesizer.

## What's in this folder

- `bingo-bloom.html`: the whole game in one file (the current version).
- `bingo-bloom-v1-night.html`: the first, upright, plum-at-night version, kept for reference.

## Our own twist

Bingo Bloom uses ideas common to many bingo games (balls, 5×5 cards, bingos left, power-ups, collectible albums, auto-daub, bets). The parts that make it ours:

- **Petals and blossoms:** bingos earn petals, and you spend them to grow Paris landmarks from 1 to 3 blossoms.
- **Flower marks:** marked numbers bloom into plum-and-gold flowers.
- **Bloom Alert:** a glowing flower bud that makes called numbers on your cards glow.
- **An album of Paris shop windows** on striped wallpaper.
- **Coming later, the biggest difference:** team play tied to Cordelle, including sending cards and ingredients and shared team goals.

## Practice version (now)

- **Title screen:** the logo, then **Tap to play**. On Android phones it tries to go full screen and sideways.
- **Map:** a little Paris with 5 landmarks:
  - Rose Patisserie
  - Cafe du Parc
  - Stone Bridge
  - Grand Carousel
  - Silk Boutique

  Tap one to build it or make it grow with petals (4, 7 and 10 petals per blossom). Growing all 15 blossoms gives 1,000 coins.
- **Top bar:** level and XP, coins, petals, and Paris progress.
- **Side buttons:** daily gift (150 coins and a Bloom Alert), album, pantry, how to play, settings.
- **PLAY:**
  1. Open the Rooms panel and pick a room. Paris Patisserie is open; Midnight Garden, Gold Coast and Candy Carnival are coming soon.
  2. Pick 1, 2 or 4 cards and a bet of ×1, ×2, ×3 or ×5. A higher bet costs more and wins more coins and petals.
- **Playing:**
  - 40 balls per round.
  - With 4 cards, 2 are big and 2 are small on the side. Tap a small card or **Swap** to switch, and a small card glows "BINGO!" when it has a win waiting.
  - The side panel holds the ball, the last 4 balls, a big "Bingos left" counter, balls, coins and petals.
  - **Boost** gives 2 free marks on each card when its meter is full.
  - **Bloom Alert** (the flower bud) makes called numbers glow. Win more from treasure squares, bingos (30% chance), level-ups and the daily gift.
  - **Auto** marks numbers for you; you still tap BINGO!
- **Treasure squares:** coins, petals, album cards, ingredients or a Bloom Alert.
- **Album:** 8 sets of 9 cards (72 in total), with 2 gold cards per set. A finished set gives 250 coins, and the whole album gives 3,000. The album has a 60-day timer, the same length as the main album in Cordelle.
- Progress is saved on the phone only.

## Ideas saved for later

- A cooking-dish collection: use pantry ingredients to bake treats for rewards.
- A team leaderboard and a bonus game.
- More rooms and cities.
- Painted art from an artist or art packs. The game is built so the pictures can be swapped.

## Step 2: team play

- Teammates log in with their Cordelle name and PIN.
- Albums are saved on the server.
- Teammates send extra cards and ingredients to each other.

## Step 3: automatic Cordelle updates

| Game data | Where it is saved | What Cordelle will use it for |
|---|---|---|
| Album cards, keyed `S1|3` (set and card number) | `album` (count of copies; extras = count - 1) | Card list and My extras |
| Ingredients | `ing` | Ingredients |
| Finished sets, album and city | `setsDone`, `albumDone`, `cityDone`, `events` (`setComplete`, `albumComplete`, `cityComplete`, `build`) | Album completions and team events |
| Rounds played | `events` (`round`) | Weekly recap |

Cordelle's Bingo Frenzy tracking stays as it is. Data from Bingo Bloom will be kept separate.
