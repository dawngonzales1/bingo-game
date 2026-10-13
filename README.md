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

### Three kinds of points
| | What it's for | How you get it |
|---|---|---|
| Tickets | Playing bingo (5 per card, times the bet) | Kitchen, daily gift (50), level-ups (20), treasure squares, side games, Team Garden |
| Coins | Power-ups and card packs in the Shop | Bingos, treasure squares, set and album rewards, side games |
| Petals | Growing Paris landmarks (1 to 3 blossoms each) | Bingos, treasure squares |

### Lobby (a Paris map you build)
- **Top:** level, tickets, coins, petals, Paris progress, settings.
- **Left:** daily gift, album, Kitchen.
- **Right:** Shop, side games, Team Garden.
- **PLAY:** pick a room, the number of cards (1, 2 or 4), a bet (×1 to ×5), and power-ups (Head Start, Double Coins, Double Petals).

### A round of bingo
- 45 balls. Speeds: Relaxed (5 s), Classic (4 s, the default), Quick (3 s).
- **A row of called numbers across the top**, drawn as little flowers, newest first. Tap it to see every called number.
- **With 4 cards:** 2 are big; tap a small card or Swap to bring the others up.
- **Power-ups during a round:**
  - **Boost:** fills as you mark numbers.
  - **Bloom Alert:** called numbers glow for the whole round.
  - **Wild Petal:** mark any square.
  - **+5 Balls:** five more balls.
- **Auto** marks numbers for you; you still tap BINGO!
- **Treasure squares:** coins, tickets, petals, album cards, ingredients, drop balls or a Bloom Alert.
- **Each bingo gives:** coins, petals, an album card, 2 ingredients, 2 drop balls and 1 seed (sometimes a Bloom Alert).

### Rooms
| Room | Kind | How it plays |
|---|---|---|
| Paris Patisserie | City room | Multi-bingo: every new line wins, up to 4 per card (Bingo, Double Bloom, Triple Bloom, Full Bouquet). Bingo is called automatically. |
| Midnight Garden | Featured | Blackout: cover all 24 squares. 65 balls. |
| Butterfly Meadow | Featured | Butterflies land on squares. Mark them before they fly away (3 balls) for tickets. Lines with a caught butterfly pay double. |
| Candy Carnival | Featured | Ingredients hide under squares. Bingo lines put them in a mixing bowl, and finished recipes bake into tickets (the ingredients also go to the pantry). |
| Gold Coast | Featured | A shape each round (heart, flower, L, T, frame, X, diamond, square). Complete it for a big prize. |
| Lantern Market | Featured | Gift squares open into a prize or a ×2/×3 boost for any bingo through them. |

- **Every round:**
  - starts with a 5-second Get ready;
  - picks one Lucky ×2 card;
  - shows a timer ring on the newest ball;
  - ends with Round complete and a Perfect Bloom bonus if you marked every called number yourself.
- **Auto Boost** fires the Boost by itself when it's full. The Boost charges per card played, and its own marks don't recharge it (tuned with a simulation of thousands of rounds).
- **Bouquet Jackpot Wheel:** a Full Bouquet or a Blackout earns a spin after the round. Tickets only, times your bet: Grand 500 (2%), Major 150 (6%), Minor 60 (12%), 40 (20%), 25 (25%), 15 (35%).
- **Garden Path** (featured rooms' bonus game): your marks fill a bar. When it's full, pick stepping stones toward the fountain:
  - the first two rows are safe;
  - Hops move you ahead;
  - a Splash ends the walk with a small prize;
  - the fountain gives 150 tickets and a gold card.
- **Gold cards outside bingo:**
  - Daily Wheel (5%)
  - Scratch Cards
  - Petal Drop's gold cup
  - the Royal Gateau
  - 3 stars in Macaron Match (50% gold)
  - Team Garden
  - card packs

### Kitchen
2 ovens. Bake treats with ingredients to earn tickets:

| Treat | Ingredients | Bakes in | Gives |
|---|---|---|---|
| Sugar Macarons | 2 sugar, 1 cream | 1 min | 20 tickets |
| Vanilla Eclair | 1 flour, 1 cream, 1 vanilla | 1.5 min | 25 tickets |
| Berry Tart | 2 berries, 1 flour, 1 butter | 2 min | 35 tickets |
| Royal Gateau | 1 of each ingredient | 5 min | 80 tickets, a Scratch Card and a Head Start |

### Shop (bought with coins)
- **Power-ups:**
  - Head Start: 150
  - Wild Petal: 100
  - +5 Balls: 200
  - Double Coins: 120
  - Double Petals: 120
  - Bloom Alert: 80
- **Card packs,** with odds shown:
  - Bronze: 3 cards, 5% gold, 250 coins
  - Silver: 5 cards, 12% gold, 600 coins
  - Gold: 8 cards, 25% gold, at least 1 gold card guaranteed, 1,200 coins

### Side games
- **Petal Drop:** drop balls down a pegboard into prize cups (tickets, coins, an ingredient or seeds).
- **Daily Wheel:** one free spin a day, with the odds of every prize shown.
- **Scratch Cards:** find 3 of the same picture to win it. About half of all cards win.
- **Macaron Match:** swap macarons to match 3. 20 moves, 3 free plays a day, and stars win tickets and seeds.

### Team Garden
- Seeds from bingos and the side games grow a weekly garden with 5 goals (25, 75, 150, 300 and 500 seeds).
- Each goal gives a prize. The last goal gives a Gold Pack.
- In this practice version only your own seeds count. In Step 2 your whole Cordelle team fills it together, and everyone gets the prizes.

### Fair Play promise
- More balls and plenty of bingos to go around.
- After 3 rounds without a bingo, your next round starts with a free Head Start.
- All odds are shown.
- The game never gets stingier.
- No real-money prizes.

### Album
8 sets of 9 cards (72 in total), with 2 gold cards per set. A finished set gives 250 coins and the whole album gives 3,000. It has a 60-day timer, like Cordelle's main album.

Progress is saved on the phone only.

## Ideas saved for later

- More rooms and cities.
- More side games that rotate in and out.
- A team leaderboard.
- Optional art redos (all rooms, landmarks, icons and 72 album cards are now painted).

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
| Seeds for the Team Garden | `garden` (week, seeds, claimed prizes) | Team events and team goals |
| Rounds played | `events` (`round`) | Weekly recap |

Cordelle's Bingo Frenzy tracking stays as it is. Data from Bingo Bloom will be kept separate.
