# Bingo Bloom, by Cordelle

A premium bingo game for phones, in the same plum, gold and cream style as the Cordelle team app.
All names, pictures and sounds are original: the pictures are drawn in code and the sounds are made by the phone's own synthesizer.

## What's in this folder

- `bingo-bloom.html`: the whole game in one file (step 1, the practice version).

## Step 1: practice version (now)

- One room, **Paris Patisserie**. Midnight Garden and Gold Coast are shown as "coming soon".
- Play 1, 2 or 4 cards (15 coins each). 40 balls per round, called every few seconds.
- Tap called numbers to mark them. Make 5 in a row (across, down or diagonal) or the 4 corners, then tap that card's **BINGO!**
- Other players claim bingos too ("Bingos left"). The earlier you call bingo, the more coins you win.
- Treasure squares give coins, album cards or pantry ingredients.
- The **Bloom Boost** fills as you mark numbers. When it's full, it gives 2 free marks on each card.
- The **album** has 4 sets (P1 to P4) of 9 cards. Cards 8 and 9 in each set are rarer gold cards. Finishing a set gives 250 coins, and finishing the album gives 2,000.
- A daily gift, settings (sounds, caller voice, ball speed) and a "start over" button.
- Progress is saved on the phone only.

## Step 2: team play (next)

- Teammates log in with their Cordelle name and PIN.
- Albums are saved on the server, so they work on any phone.
- Teammates can send each other extra cards (15 a day).

## Step 3: automatic Cordelle updates

The game already records what Cordelle will need:

| Game data | Where it is saved | What Cordelle will use it for |
|---|---|---|
| Album cards, keyed `P1|3` (page and card number) | `album` (count of copies; extras = count - 1) | Card list (needed or have) and My extras |
| Ingredients | `ing` | Ingredients |
| Finished sets and finished album | `setsDone`, `albumDone`, `events` (`setComplete`, `albumComplete`) | Album completions |
| Rounds played | `events` (`round`) | Team events and weekly recap |

Cordelle's Bingo Frenzy tracking stays as it is. Data from Bingo Bloom will be kept separate.
