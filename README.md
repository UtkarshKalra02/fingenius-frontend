# 💰 FinGenius Frontend

The official frontend for **FinGenius**, an AI-powered personal finance mentor. This app enables users to upload their transaction data, visualize spending trends, chat with an AI assistant, and receive powerful financial insights — all through a clean and responsive UI.

---

## 🚀 Features

- 🔐 Secure **Authentication** via AWS Cognito (OIDC)
- 📊 Dynamic **Dashboard**:
  - Total & monthly spend cards
  - Category-wise spending pie chart
  - Spending trend line chart
  - Recent transactions table
- 📤 **CSV Upload** with:
  - Header validation
  - Real-time toast feedback
- 💬 **AI Chat Assistant** for finance-related queries
- 💡 **Gemini Insights**:
  - Top spending categories
  - Anomaly detection
  - Month-over-month trends
- 🎯 Role-protected pages with persistent sessions

---

## 🧱 Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Framework  | [Next.js 14 (App Router)](https://nextjs.org/) |
| Styling    | [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.dev/) |
| Charts     | [Recharts](https://recharts.org/en-US/) |
| Markdown   | `react-markdown` + `remark-gfm` |
| Auth       | `react-oidc-context` with AWS Cognito |
| AI Model   | Gemini 2.5 Flash via Vertex AI (backend) |

---

## 📁 Folder Structure
src/
├── app/                        # App Router Pages
│   ├── dashboard/             # Summary dashboard with charts
│   ├── chat/                  # AI-powered finance chat
│   ├── upload/                # Transaction CSV uploader
│   ├── insights/              # Gemini-generated insights
│   ├── settings/              # (Optional) User preferences/settings
│   └── layout.tsx            # Shared layout wrapper
│
├── components/                # Reusable UI components
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── SummaryCard.tsx
│   ├── SpendingLineChart.tsx
│   ├── CategoryPieChart.tsx
│   └── TransactionsTable.tsx
│
├── lib/                       # API helper functions (e.g. fetchSummary, sendChat)
│
├── styles/                    # Tailwind config or global CSS
│
├── context/                   # (Optional) Auth or theme context
│
└── public/                    # Static assets like logos or icons
