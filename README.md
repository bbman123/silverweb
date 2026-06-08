# Receipt Generator

A simple, lightweight web application for generating professional payment receipts for ACH and SWIFT transactions.

## Features

- Secure login with session authentication
- ACH (USD), SWIFT USD, and SWIFT EUR payment types
- Datetime picker with formatted output (e.g. _30 June 2026 at 7:44 pm_)
- Transaction status: **Settled** or **Pending**
- Form data retained when navigating back from receipt
- Print-ready receipt layout
- Deployable to Netlify

## Default Credentials

```
Username: admin
Password: admin123
```

> Change these via environment variables in production (see below).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Install & Run

```bash
npm install
npm start
```

Open your browser at: **http://localhost:3000**

## Environment Variables

Set these to override defaults in production:

| Variable          | Default                       | Description                   |
|-------------------|-------------------------------|-------------------------------|
| `APP_USERNAME`    | `admin`                       | Login username                |
| `APP_PASSWORD`    | `admin123`                    | Login password                |
| `SESSION_SECRET`  | `simple-receipt-app-secret`   | Session encryption secret     |
| `PORT`            | `3000`                        | Port to listen on             |

Example `.env` usage (requires `dotenv` package, not included by default):

```bash
APP_USERNAME=youruser
APP_PASSWORD=yourpassword
SESSION_SECRET=a-long-random-string
```

## Deploying to Netlify

This project includes a `netlify.toml` configuration.

1. Push the project to a GitHub repository
2. Go to [netlify.com](https://netlify.com) → **New site from Git**
3. Connect your GitHub repo
4. Netlify will detect the configuration automatically
5. Set environment variables in **Site settings → Environment variables**

## Payment Types

| Type        | Fields                                                    |
|-------------|-----------------------------------------------------------|
| ACH (USD)   | Payment Method, Bank Name, Account Number, Routing Number |
| SWIFT (USD) | Payment Method, Bank Name, Account Number, BIC/SWIFT      |
| SWIFT (EUR) | Payment Method, IBAN, BIC/SWIFT, Country                  |

## Project Structure

```
silverweb/
├── views/
│   ├── login.ejs       # Login page
│   ├── dashboard.ejs   # Payment form
│   └── receipt.ejs     # Generated receipt
├── public/             # Static assets
├── index.js            # Express server
├── package.json
├── netlify.toml        # Netlify deployment config
└── .gitignore
```
