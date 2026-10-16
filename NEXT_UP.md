# Next up (waiting on artwork)

Notes from Dawn and the admins to build when the Firefly art arrives.

## House rule (Dawn, Oct 14)
"Everything in the app needs pizzazz and to be flashy and bubbly." Every screen and pop-up gets motion, sparkle and bounce; nothing plain or still.

## Featured rooms (Dawn, Oct 14)
"The featured rooms is just a boring row of them at the bottom of the screen. There's no pizzazz or anything enticing to click on them."
Ideas to build with the new art:
- Make them a showcase, not a strip: one big hero room card that rotates through the rooms every few seconds, with the others as smaller tiles beside it.
- Cordie pops out of the hero card pointing at it ("Try Butterfly Meadow today!").
- Live bits on each tile: a jackpot counter ticking up, "players now" count, a countdown for today's HOT room, the 2 featured power-ups for that room.
- Motion: tiles gently bob, sparkles, a shine sweep, the HOT room glowing and pulsing, new rooms with a NEW ribbon that wiggles.
- Room-themed daubs shown on each tile (butterfly, lollipop, lantern, shell, moonflower).

## Pictures Claude makes (Dawn skips these in Firefly)
- Cordie head-and-shoulders (`mascot-face`): crop from `mascot-wave`.
- Loading screen (`splash-paris`): `room-paris` background + cut-out `mascot-wave`, with animated petals and balloons in the game.

## Lettering Claude adds on top of icons (Dawn, Oct 14)
- All ×2 icon: the Firefly medallion stays blank; the game adds crisp "ALL ×2" lettering on top (gold/plum, sparkling).
- Same for other icons that read better with a word or number (e.g. +5 on +5 Balls, ×2 on Double XP).

## Art to swap in when it arrives
- Cordie mascot: welcome back, Bloom Calendar presenter, tips, celebrations, sleeping on the gift button.
- Loading screen key art.
- Paris city room backgrounds (Cafe, Carousel, Boutique).
- Picture icons for power-ups (bar, Shop, pack reveals).
- Ingredient pictures (Kitchen, Bake to Win, summary).
- Room daubs, Macaron Match pieces, store/gift art, reward pop-up art.

## Done from admin feedback
- Crystal (Oct 14): card pack pictures and names were too small to read. Fixed: cards are bigger and the art and names fill the card.

## Living map direction (Dawn's Bingo Frenzy recording, Oct 14)
"This is the direction I'm going": animation everywhere, nothing sits still.
- City name banner sweeps across the map when you arrive, then fades.
- The map is alive: water flowing, birds flying past, boats bobbing.
- A pulsing gold ring around the player's own picture pin on the current landmark.
- Event tiles play like tiny movies (scenes change, sun flares, spotlights).
- Each side icon has its own little act: ticket flips, chick hatches, clam opens to show a pearl, chest bobs.
- Gems and stars glint with a light sweep.

## Competitor recordings (Bingo Blitz Xtra and Bingo Bash, Oct 14)
Worth borrowing (fair, no money pressure):
- Daily and weekly challenges ("Call 3 bingos", "Use 20 power-ups", "Daub 130 odd numbers") feeding a season reward path. Bloom version: a free Bloom Season path, no paid pass.
- A free gift in the Shop every few hours, with the prizes flying into your counters ("Gift Collected!").
- Story intro the first time you open a room: a few comic panels with Cordie, then "Let's Bingo!".
- Weekly friendly leagues: small groups, points from bingos, "Ranked up!" moment, prizes for everyone who plays.
- Daily Raffle (like Lottery Bash): earn tokens from bingos, a daily draw of winning balls.
- Room cards flip to show cost and payouts.
- Chef Menu (Blitz) = our Kitchen; "Dish Served!" big reveal moment is a good model.
Skip (greedy or off-brand):
- Sale pop-ups stacked on opening the app, "100% more gems", endless sale chains, paid unlock paths, countdown pressure, slots and casino mini games.

## Team feedback, Oct 14 (first test day)
Bugs: blackout froze ~5s and the voice came on after it (Jo Anne); voice calls missing after a restart in Gold Coast (Sapphire); Macaron Match kicks you out on each move (Mac Safari); Petal Drop balls get stuck (Sapphire); Kitchen red dot with nothing ready; Album icon overlaps the gift button; flashing missed numbers trigger migraines, but others say the called-number glow is now too hard to see (Crystal, Jo Anne).
Seeing: ball numbers and macarons too small, text shadows, white gloss spots, busy backgrounds (Sherri, visually impaired; Mac player).
Speed: still too fast even on Relaxed (Crystal: "biggest complaint").
Clarity: how do you know a room is complete (Sandy); daily gift button unclear (sleeping bunny, purple square); signed-in name not shown anywhere, wants a picture (Sandy); step-by-step guide for new players (Sandy); Kitchen unclear.
Looks: featured tiles too busy, should be subtle but eye-catching; Cordie hopping between tiles looks cheap and laggy, should stay and point; next city should be a blurred teaser, not plain; buttons overlapping; still looks plain/cheap, needs better animation.
Team/social (online): one place for everything Teams; send cards from the album; see who on your team is online; dots for new messages, friend requests and cards; tap a teammate to friend them.
Ideas: Bee power-up like Bingo Frenzy's boomerang (Crystal). Unique game names (already enforced). Crystal likes being able to choose auto-mark (kept in Settings).

## Team feedback, Oct 14 (evening)
- Sapphire: themes that change with the seasons, plus seasonal side games (autumn leaves, winter lights, spring blossom, summer beach). Good fit for the second city plan.
- Done: fireworks stuck on after a Shop purchase (fixed); caller voice livelier; Clear view ball numbers now really bigger; white text gets a crisp outline in Clear view; tour Cordie layered above the shade; wheel hub flush.
- Open: 'ghostly bunnies' on tutorial panels (one player, Chrome) - need a screenshot to see it.

## Anti-cheat (added Oct 15)
- `firestore.rules` in the repo is the full rules file. Paste it whole into Firebase console → Firestore Database → Rules, replace `REPLACE_WITH_DAWN_UID` with your own uid (Settings → Sign In / Account shows it), then Publish. It replaces the earlier two edits (requests allow update, teams ≤ 40): both are included.
- What the rules stop: gifting beyond the daily caps (10 ticket gifts, 5 cards, 2 gold cards, 10 ingredients) even from an edited client; fake gifts "from" someone else; profile levels above 300 or jumping more than 10 at once; oversized saves; teams over 40; chat over 200 characters; anyone but you reading feedback.
- What the game itself does: every time a save is loaded (phone or cloud) or sent to the cloud, impossible values are clamped back to what play could have earned (caps grow with rounds, level, tester boosts and purchases). Each clamp adds 1 to `flags` on the player's public profile, so a cheater shows up as `flags > 0` in the users collection in the console.
- Top 3 Bingo (Oct 15): real players now. Each round end posts your weekly bingo total for that room to `boards/{room}_{weekStart}/players/{uid}`; the room panel shows the top three with avatars and counts, and marks you in gold. `firestore.rules` already includes the `boards` block (own row only, bingos ≤ 2000, no jump over 40 per write). Boards roll over each week with the league.
- Warm Up Cordie (Oct 16): first 24-hour daily mission, in Events. Daubs in any round earn Warm Balls (marks × bet ÷ 6, min 1); fire them at a 5×5 pipe board; melt all 25 before the 8 AM Central reset for 1,000 coins, 15 amethysts and 30 min Bloom Alert. Resets with the day. Later: translate its strings, a Firefly frozen-greenhouse scene, and more daily missions in the same slot (ideas: catch butterflies, fill the picnic basket, light the lanterns).
