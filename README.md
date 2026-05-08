# MeiPay Desktop

**HR & Payroll Platform for Meiborg — Windows Desktop Application**

MeiPay Desktop is a full-featured Human Capital Management (HCM) platform built with Electron, React, TypeScript, and Tailwind CSS. Deployable as an MSIX package to the Microsoft Store.

---

## Features

- Dashboard with headcount trends, payroll spend charts, and pending action alerts
- Employee directory with search, filtering, and status management
- Payroll processing — pay period management, run payroll, pay stub tracking
- Time & Attendance — clock-in/out logging, leave requests, manager approvals
- Onboarding — new hire task checklists with progress tracking
- Talent Management — performance review cycles and goal tracking
- Benefits Administration — plan enrollment and open enrollment management
- Compliance — regulatory filing deadline tracker (EEO-1, ACA, OSHA, W-2, etc.)
- Analytics — headcount by department, turnover trends, key HR metrics
- Settings — profile management and application preferences

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Framework | Electron 28 |
| Frontend | React 18 + TypeScript |
| Routing | React Router v6 (HashRouter) |
| Styling | Tailwind CSS |
| State Management | Zustand with persistence |
| Charts | Recharts |
| Build Tool | Vite + vite-plugin-electron |
| Packaging | electron-builder (MSIX + NSIS) |
| Icons | Lucide React |

---

## Project Structure

```
meipay-desktop/
├── electron/
│   ├── main.ts          # Electron main process (BrowserWindow, IPC handlers)
│   └── preload.ts       # Context bridge — exposes safe API to renderer
├── src/
│   ├── pages/           # All application pages
│   │   ├── login.tsx
│   │   ├── dashboard.tsx
│   │   ├── employees.tsx
│   │   ├── payroll.tsx
│   │   ├── time-tracking.tsx
│   │   ├── onboarding.tsx
│   │   ├── talent.tsx
│   │   ├── benefits.tsx
│   │   ├── compliance.tsx
│   │   ├── analytics.tsx
│   │   └── settings.tsx
│   ├── components/
│   │   └── layout/
│   │       ├── title-bar.tsx    # Custom frameless window title bar
│   │       └── sidebar.tsx      # Collapsible navigation sidebar
│   ├── store/
│   │   └── auth.ts              # Zustand auth store with persistence
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx                  # Router + protected route logic
│   ├── main.tsx                 # React entry point
│   ├── index.css
│   └── electron.d.ts            # Window.meipay type declarations
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Windows 10/11 (for MSIX build)

### Development

```bash
# Clone the repository
git clone https://github.com/dmarcum-rgb/meipay-desktop.git
cd meipay-desktop

# Install dependencies
npm install

# Start in development mode (Vite + Electron)
npm run dev
```

This launches both the Vite dev server and Electron simultaneously with hot reload.

---

## Building for Production

### Standard installer (NSIS)

```bash
npm run build:win
```

Outputs a standard Windows installer (.exe) to the `release/` directory.

### Microsoft Store (MSIX)

```bash
npm run dist
```

Outputs an MSIX package to `release/`. To publish to the Microsoft Store:

1. Create a developer account at [partner.microsoft.com](https://partner.microsoft.com)
2. Create a new app submission and reserve your app name
3. Update `package.json` build config with your Publisher identity:
   ```json
   "appx": {
     "identityName": "YourIdentityName",
     "publisher": "CN=YourPublisherID",
     "publisherDisplayName": "Meiborg"
   }
   ```
4. Sign the MSIX with your code signing certificate
5. Upload the signed MSIX to Partner Center

---

## Design System

| Token | Color | Usage |
|-------|-------|-------|
| Navy | `#0F1E3C` | Sidebar, headings, primary buttons |
| Slate | `#1E2D4E` | Hover states |
| Accent | `#2563EB` | CTAs, active nav, links |
| Light | `#F8FAFC` | Page background |
| Muted | `#64748B` | Secondary text |
| Border | `#E2E8F0` | Card borders, dividers |

---

## Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@meiborg.com | meipay2026 | Admin |
| hr@meiborg.com | meipay2026 | HR Manager |

---

Built for Meiborg.
