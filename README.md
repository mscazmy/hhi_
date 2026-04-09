# Higher Health Institution – Wasit

Official website for HHI Wasit, Iraq.

## Structure

```
├── index.html          # Homepage
├── departments.html    # Nursing, Emergency, Midwifery departments
├── news.html           # News & announcements
├── theses.html         # Student theses archive
├── about.html          # About the institution
├── contact.html        # Contact page
├── admin.html          # Admin portal (login required)
├── css/style.css       # Shared stylesheet
└── js/
    ├── app.js          # Data management (localStorage)
    └── layout.js       # Shared header/footer
```

## Hosting on GitHub Pages

1. Create a new public repository on GitHub (e.g. `hhi-wasit`)
2. Upload all files maintaining the folder structure above
3. Go to **Settings → Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose `main` branch and `/ (root)` folder
6. Click **Save** — your site will be live at `https://<your-username>.github.io/hhi-wasit/`

## Admin Portal

- URL: `admin.html`
- Default credentials: `admin` / `hhi2025`
- **Change the password** in `js/app.js` (`ADMIN_PASS` constant) before publishing!

## Notes

- All data (theses, news) is stored in the browser's `localStorage`.
- For a production site, replace localStorage with a real backend (Firebase, Supabase, etc.).
- To connect a real contact form, sign up at [Formspree](https://formspree.io) and update `contact.html`.
