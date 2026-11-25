# Damith Nadishan — Engineering Portfolio (Version 3)

A responsive static portfolio for GitHub Pages, using genuine photographs extracted from the supplied image archive and PDF.

## Included
- `index.html`, `styles.css`, `script.js`
- `assets/` — optimized WebP copies of selected project photographs and portrait
- Responsive layout, project filters, image lightbox, experience timeline and patent section

## Publish to the existing repository
1. Extract this ZIP.
2. Open `https://github.com/dnadishan/dnadishan.github.io`.
3. Upload the contents of this folder to the repository root.
4. Replace `index.html`, `styles.css`, `script.js`; upload the `assets` folder.
5. Commit changes to `main`.
6. GitHub Pages should redeploy automatically. Keep the current Pages configuration.

## Content decisions used
- Experience headline: 25 years (as confirmed by Damith).
- Spera Labs: 2018–2023 (as confirmed by Damith).
- Perpion: Co-Founder & CTO, 2023–Present (from supplied portfolio).
- Patent section: four records — two granted and two pending applications (as confirmed by Damith).

## Before public launch
- Verify patent numbers, titles, status and inventor attribution against official USPTO records.
- Confirm that project/customer photographs and names may be publicly disclosed.
- Review contact details and professional links.
- This site intentionally excludes date of birth and residential street address from the supplied CV.

## Local preview
Open `index.html` in a browser. For a local server, run:
`python3 -m http.server 8000`
Then visit `http://localhost:8000`.

## Email / DNS safety
This package does not require any DNS changes. When connecting `nadishan.com`, add only GitHub Pages website records and preserve Google Workspace MX, SPF, DKIM, DMARC and verification records.
