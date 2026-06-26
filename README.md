# 🛡️ FraudShield — Financial Fraud Detection

A cloud-ready, real-time financial fraud detection dashboard built with React, Vite, and Recharts. Deployable to GitHub Pages or any static hosting in minutes.

![FraudShield Dashboard](https://img.shields.io/badge/Status-Live-00E5B0?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)

## Features

- **Live Transaction Feed** — Real-time simulated transaction stream with fraud scoring
- **Risk Scoring Engine** — ML-style risk scores (0–100) per transaction
- **Alert Feed** — Prioritized high-risk alerts panel with one-click investigation
- **Analytics Dashboard** — Fraud trends, risk distribution, blocked vs flagged charts
- **Transaction Detail Modal** — Full risk breakdown with fraud flag indicators
- **Detection Rules Panel** — View and manage rule-based fraud detection policies
- **Search & Filter** — Filter transactions by risk level, status, or keyword

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Charts | Recharts |
| Icons | Lucide React |
| Styling | Tailwind CSS |
| Fonts | Space Grotesk + Inter + JetBrains Mono |
| CI/CD | GitHub Actions |
| Deploy | GitHub Pages |

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/fraudshield.git
cd fraudshield

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# Opens at http://localhost:3000
```

## Deploy to GitHub Pages

### Automatic (Recommended)

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Every push to `main` auto-deploys via `.github/workflows/deploy.yml`

> ⚠️ Update the `base` in `vite.config.js` to match your repo name:
> ```js
> const base = process.env.GITHUB_ACTIONS ? '/YOUR-REPO-NAME/' : '/'
> ```

### Manual

```bash
npm run build
# Upload the `dist/` folder to any static host (Vercel, Netlify, S3, etc.)
```

## Project Structure

```
fraudshield/
├── src/
│   ├── components/
│   │   ├── StatsGrid.jsx       # KPI stat cards
│   │   ├── TransactionTable.jsx # Filterable transaction list
│   │   ├── TransactionModal.jsx # Detail view with risk ring
│   │   ├── AlertFeed.jsx       # Real-time high-risk alerts
│   │   └── Charts.jsx          # Recharts visualizations
│   ├── utils/
│   │   └── mockData.js         # Realistic fraud data generator
│   ├── App.jsx                 # Main app shell + routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind + custom styles
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Extending with a Real Backend

Replace `src/utils/mockData.js` calls in `App.jsx` with API calls:

```js
// Example: replace generateInitialTransactions()
const [transactions, setTransactions] = useState([]);

useEffect(() => {
  fetch('https://your-api.com/transactions')
    .then(r => r.json())
    .then(setTransactions);
}, []);
```

Suggested backend stack: **Node.js / FastAPI + PostgreSQL + Redis** for real-time fraud scoring.

## License

MIT
