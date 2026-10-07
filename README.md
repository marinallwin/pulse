# Pulse

A modern SaaS dashboard application for tracking revenue and customer analytics.

## What is this?

Pulse is a web app that helps businesses track their revenue, customers, and transactions. It includes a landing page to showcase the product and a dashboard with charts and data tables.

## Features

- **Landing Page** - Product showcase with pricing, features, and FAQ
- **Dashboard** - View revenue charts, customer stats, and transaction data
- **Search & Filter** - Find customers and transactions easily
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Recharts (for charts)
- React Router

## Getting Started

```bash
# Install dependencies
npm install

# Run the app
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 to view it in your browser.

## Project Structure

```
src/
├── api/           # Mock API functions
├── components/    # Reusable components
├── data/          # Mock data
├── hooks/         # Custom React hooks
├── pages/         # Main pages
└── App.jsx        # Main app component
```

## Notes

- Uses mock data (no real backend needed)
- Network delays are simulated for realistic loading states
- All data is generated client-side

