Playwright Hybrid Automation Framework (UI + API)

A scalable end-to-end automation framework built with Playwright (TypeScript) to test UI, API, and Hybrid flows for GitHub workflows.
Designed with clean architecture, session reuse, CI integration, and production-grade reporting.

✨ Key Features

✅ UI Automation with Playwright (Page Object Model)

🔗 API Testing using Playwright’s APIRequestContext

🔀 Hybrid Tests (API setup + UI validation)

🔐 Session Reuse using storageState (auth.json)

⚙️ Multi-project setup (ui, api, hybrid)

🤖 CI/CD Ready (GitHub Actions)

📊 Reports: HTML + Allure

🧪 Parallel execution & retries

🧱 Tech Stack

Playwright + TypeScript

Node.js

dotenv for secrets

GitHub Actions for CI

Allure for reporting

📁 Project Structure
.
├── tests/
│   ├── ui/           # UI test specs
│   ├── api/          # API test specs
│   └── hybrid/       # API + UI combined flows
├── pageObjects/
│   └── UIpageObjects/
├── utils/
├── playwright.config.ts
├── auth.json         # Storage state (login session)
├── .env              # Secrets (not committed)
└── package.json

⚙️ Setup
1️⃣ Prerequisites

Node.js >= 18

npm / pnpm / yarn

2️⃣ Install dependencies
npm install
npx playwright install

3️⃣ Create .env
BASE_URL=https://github.com
USER_NAME=your_username
PASSWORD=your_password


⚠️ Never commit .env to GitHub.

▶️ Running Tests
Run all tests
npx playwright test

Run UI tests only
npx playwright test --project=ui

Run API tests only
npx playwright test --project=api

Run Hybrid tests
npx playwright test --project=hybrid

Run in UI mode (debug)
npx playwright test --ui

⚠️ If GitHub invalidates the session, regenerate auth.json.

🤖 CI/CD (GitHub Actions)

Tests can be scheduled or triggered on push/PR using GitHub Actions.

Features:

Nightly scheduled runs

Secrets injected from GitHub Secrets

HTML + Allure report artifacts

📊 Reports
HTML Report
npx playwright show-report

Allure Report
allure generate allure-results --clean -o allure-report
allure open allure-report

🧠 Best Practices Followed

Page Object Model for UI tests

Test isolation via projects

No hard-coded credentials

API used for setup where possible

UI used only for validation

Avoided flaky waits (waitForTimeout)

Parallel execution enabled

🧪 Example Use Cases Covered

Login session reuse

Repository creation via UI

API-driven data setup + UI verification

Negative UI validations

Hybrid end-to-end workflows

🚧 Future Enhancements

🔄 Token-based API auth

📱 Mobile browser projects

🐳 Dockerized test execution

📈 Test analytics dashboard

🧹 Auto-refresh storageState

👤 Author

Built by Ayush
QA / SDET | Playwright | CI/CD | API Automation
