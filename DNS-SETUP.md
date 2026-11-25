# DNS safety note for nadishan.com

Do not change DNS as part of uploading this website update. Your existing GitHub Pages site should continue to work at `https://dnadishan.github.io`.

When you are ready to connect the custom domain:
1. Back up/export the current Cloudflare DNS zone.
2. Set `nadishan.com` as the custom domain in GitHub Pages first.
3. Add GitHub Pages A records for the apex domain and a CNAME for `www` pointing to `dnadishan.github.io`.
4. Preserve all Google Workspace MX records and all existing SPF, DKIM, DMARC and Google verification TXT records.
5. Do not replace the root TXT SPF record or remove mail-related records.
6. Verify email sending and receiving after any DNS changes.

Check GitHub's current official custom-domain documentation for the current record values before making changes.
