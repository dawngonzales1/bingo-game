# BHS Baseball Sponsorships — Setup

Sponsors open a link, fill out the form, and upload their logo. Each submission goes to:

- **A Google Sheet** (one row per sponsor): date, business name, contact name for sign/ad approval, contact phone, notes, and a link to the logo.
- **A Google Drive folder** ("BHS Baseball Sponsor Logos") holding the **original logo file, not compressed or resized**, so it's ready for sponsor posters.

The boss only needs the Sheet. It's free and runs on a Google account. Setup takes about 10 minutes.

---

## 1. Create the Google Sheet + backend (use the boss's Google account)

1. Sign in to the Google account that should own the sponsor info. This is where the Sheet and logos will live.
2. Go to <https://sheets.new> and name the sheet **BHS Baseball Sponsorships**.
3. In the Sheet, open **Extensions → Apps Script**.
4. Delete the code that's there, then paste in all of [`google-apps-script/Code.gs`](google-apps-script/Code.gs). Click **Save** (💾).
5. In the function dropdown at the top, pick **`setup`** and click **Run**. Google will ask for permission: click **Review permissions**, choose the account, then **Advanced → Go to (project name) → Allow**.
   This creates the **Sponsors** tab and the Drive folder.

## 2. Deploy the backend as a web app

1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" and pick **Web app**.
3. Set:
   - **Execute as:** *Me*
   - **Who has access:** *Anyone* (sponsors don't need a Google account)
4. Click **Deploy** and **copy the Web app URL**. It ends in `/exec`.

## 3. Connect the form

Open [`config.js`](config.js) and paste the URL:

```js
window.SPONSOR_APP_CONFIG = {
  scriptUrl: 'https://script.google.com/macros/s/XXXXXXXX/exec'
};
```

Commit the change.

## 4. Put the form online (GitHub Pages, free)

1. On GitHub, open the repo → **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**. Pick the branch that has this folder, with folder **/ (root)**, then **Save**.
3. After about a minute, the form is live at:
   `https://<your-github-username>.github.io/<repo-name>/bhs-sponsorships/`

**That's the link to send to sponsors.** On a phone they can also choose **Add to Home Screen** to install it as the "BHS Sponsors" app with the BHS Baseball logo as its icon.

## 5. Test it

Submit one test sponsor with a logo, then check that a row appears in the **Sponsors** tab and the file is in the Drive folder. Delete the test row/file afterward.

---

## Notes

- **Logo quality:** the form accepts PNG, JPG, SVG, PDF, AI, EPS, PSD, TIFF, and WEBP up to 25 MB. If a PNG or JPG is under 1000 px on its shortest side, the sponsor sees a warning asking for a larger or vector version, but they can still submit it.
- **Downloading logos:** click the link in the "Logo Link" column, or open the Drive folder and select several files → **Download** to get them all as a zip.
- **Changing the backend code later:** after editing `Code.gs`, use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. That keeps the same URL.
