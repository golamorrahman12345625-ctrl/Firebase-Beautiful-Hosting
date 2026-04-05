# AL-YAMEN Dashboard — Firebase Hosting Deployment

## Prerequisites

1. [Node.js](https://nodejs.org/) installed
2. Firebase CLI installed:
   ```bash
   npm install -g firebase-tools
   ```
3. A Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)

## Steps

### 1. Login to Firebase
```bash
firebase login
```

### 2. Update project ID
Edit `.firebaserc` and replace `al-yamen-dashboard` with your actual Firebase project ID.

### 3. Build the app
```bash
BASE_PATH=/ pnpm run build
```
This creates the production build in `dist/public/`.

### 4. Deploy to Firebase
```bash
firebase deploy --only hosting
```

## Notes
- The app is a **fully static React SPA** — no backend required.
- Firebase Hosting serves the `dist/public` folder.
- All routes are rewritten to `index.html` (handled by the SPA router).
- After deploying, your app will be live at `https://al-yamen-dashboard.web.app`
