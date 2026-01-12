# Plan by Claude
### Project Overview
Building a production-grade web application that uses Claude AI to analyze resumes, suggest improvements, and apply approved changes. The application includes a token-based credit system with subscription and one-time purchase options.

### Tech Stack
Frontend
Framework: Next.js 14+ (App Router) with React & TypeScript
UI: shadcn/ui + Radix UI + Tailwind CSS
State: Zustand + React Query
Forms: React Hook Form + Zod
PDF Rendering: react-pdf
Real-time: Socket.io-client

### Backend
Runtime: Node.js 20+ with Express & TypeScript
Database: PostgreSQL 15+ with Prisma ORM
Cache/Queue: Redis (sessions, rate limiting, Bull queues)
Auth: NextAuth.js v5
Payments: Stripe (checkout + subscriptions)
Real-time: Socket.io

### AI & Documents
AI: Anthropic Claude API (Claude 3.5 Sonnet)
PDF Parsing: pdf-parse, pdfjs-dist
PDF Editing: pdf-lib, Puppeteer (for complex changes)
Storage: AWS S3 (or MinIO for self-hosted)

### Infrastructure
Deployment: Self-hosted on AWS/GCP/Azure
Containerization: Docker + Docker Compose
Proxy: Nginx
Monitoring: Sentry, Prometheus + Grafana
CI/CD: GitHub Actions


## File Structure
Root Level

chat-support/
├── .github/workflows/          # CI/CD pipelines
├── apps/                       # Application code
├── packages/                   # Shared packages
├── infrastructure/             # DevOps & deployment
├── docs/                      # Documentation
└── [config files]             # Root configs
Apps - Frontend (Next.js)

apps/web/
├── app/
│   ├── (auth)/                # Auth routes (grouped)
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-email/
│   │   └── forgot-password/
│   ├── (dashboard)/           # Protected routes (grouped)
│   │   ├── dashboard/
│   │   ├── resumes/
│   │   │   ├── upload/
│   │   │   └── [id]/review/  # Main review interface
│   │   ├── tokens/
│   │   ├── billing/
│   │   └── settings/
│   └── api/
│       ├── auth/[...nextauth]/
│       └── webhooks/stripe/
├── components/
│   ├── ui/                    # shadcn components
│   ├── resume/                # Resume-specific components
│   ├── billing/               # Payment components
│   ├── layout/                # Layout components
│   └── tokens/                # Token components
├── lib/                       # Utilities
├── hooks/                     # React hooks
├── store/                     # Zustand stores
└── [config files]
Apps - Backend (Express API)

apps/api/
├── src/
│   ├── config/               # Database, Redis, Storage configs
│   ├── modules/
│   │   ├── auth/            # Authentication
│   │   ├── users/           # User management
│   │   ├── resumes/         # Resume operations
│   │   ├── ai/              # Claude AI integration
│   │   ├── pdf/             # PDF parsing & editing
│   │   ├── tokens/          # Token system
│   │   ├── payments/        # Stripe integration
│   │   └── storage/         # S3/file storage
│   ├── websocket/           # Socket.io handlers
│   ├── jobs/                # Background workers
│   ├── middleware/          # Express middleware
│   ├── utils/               # Logger, errors, validators
│   └── types/               # TypeScript types
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
Packages - Shared Code

packages/
├── shared-types/            # Shared TypeScript types
│   └── src/
│       ├── user.types.ts
│       ├── resume.types.ts
│       ├── suggestion.types.ts
│       ├── conversation.types.ts
│       ├── token.types.ts
│       ├── payment.types.ts
│       └── api.types.ts
└── validation/              # Shared Zod schemas
    └── src/schemas/
        ├── user.schema.ts
        ├── resume.schema.ts
        ├── suggestion.schema.ts
        ├── payment.schema.ts
        └── conversation.schema.ts
Infrastructure

infrastructure/
├── docker/
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   ├── docker-compose.yml
│   └── docker-compose.dev.yml
├── nginx/
│   ├── nginx.conf
│   └── nginx.dev.conf
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   ├── backup.sh
│   └── restore-db.sh
└── terraform/               # IaC (optional)
    ├── main.tf
    ├── variables.tf
    └── outputs.tf
Documentation & CI/CD

.github/workflows/
├── ci.yml                   # Continuous integration
└── deploy.yml               # Deployment pipeline

docs/
├── API.md                   # API documentation
├── ARCHITECTURE.md          # Architecture overview
├── DEPLOYMENT.md            # Deployment guide
└── DEVELOPMENT.md           # Development setup

### Key Configuration 
package.json (root + each app/package)
turbo.json (monorepo orchestration)
tsconfig.json (TypeScript configs)
.gitignore, .prettierrc, .eslintrc.json
.env.example (environment variables template)
docker-compose.yml (local development)


## Core Database Schema 
Key Tables:

User: Authentication, token balance, subscription status
Resume: Uploaded resumes with parsing status and metadata
Suggestion: AI-generated improvement suggestions
Conversation: Chat sessions between user and AI
Message: Individual messages in conversations
TokenTransaction: Audit log of all token additions/deductions
Payment: Stripe payment records
AnalysisResult: Detailed resume analysis findings

### Critical Relationships:

User → Resumes (one-to-many)
Resume → Suggestions (one-to-many)
Resume → Conversations (one-to-many)
Conversation → Messages (one-to-many)
User → TokenTransactions (one-to-many)


# Key Technical Implementations
### 1. PDF Processing Pipeline
Three-stage approach:

Parsing & Extraction

Extract text with pdf-parse
Analyze layout with pdfjs-dist (margins, fonts, spacing)
Store structured data in database
AI Analysis

Send structured data to Claude API
Identify ATS issues, formatting problems, content improvements
Generate categorized suggestions with severity levels
Change Application

Simple changes: Direct PDF modification with pdf-lib
Complex changes: Convert to HTML → apply changes → regenerate PDF with Puppeteer
Track versions (original vs. edited)

### 2. Conversational AI System
Architecture: Event-driven WebSocket system

Flow:

User uploads resume → Background job analyzes → Suggestions generated
User opens review interface → WebSocket connection established
AI presents findings conversationally
User asks "why?" questions → AI explains with context
User approves/denies → Tokens deducted → Changes applied
Conversation States:

INITIAL_REVIEW: AI analyzing resume
PRESENTING_SUGGESTIONS: AI presenting findings
DISCUSSING_SUGGESTION: User asking questions
APPLYING_CHANGES: Processing approvals
COMPLETED: Review finished
Optimization:

Cache resume analysis (avoid re-analysis)
Use prompt caching for system instructions
Compress conversation history
Set max_tokens limits by state

### 3. Token System
Token Costs:

Initial scan: Free (marketing tool)
Ask AI question: 1-5 tokens (complexity-based)
Approve suggestion: 10-50 tokens (change complexity)
Follow-up scan: 20 tokens
Implementation: Atomic transactions with row-level locking in PostgreSQL


// Middleware checks balance before action
// On success, deduct tokens atomically
// Log transaction for audit trail
Enforcement Points:

Middleware on question endpoints
Pre-approval balance check
Real-time balance updates via WebSocket

### 4. Payment Integration

Two Payment Flows:

One-Time Token Purchase

User selects token package → Stripe Checkout
Webhook confirms payment → Add tokens to balance
Subscription

User selects plan (Basic/Pro/Unlimited)
Stripe Subscription created
Monthly webhook → Refill tokens
Subscription Tiers:

Basic: 100 tokens/month - $9.99
Pro: 300 tokens/month - $24.99
Unlimited: Unlimited tokens - $49.99
Security:

Verify webhook signatures
Idempotency keys for all operations
Handle cancellations and refunds

### 5. Security Measures
File Upload:

MIME type verification (not just extension)
10MB size limit
Virus scanning with ClamAV
Signed S3 URLs (no direct access)
Auto-delete after 90 days
API Security:

Rate limiting (per-IP and per-user)
Input validation with Zod
Output sanitization (prevent XSS in AI responses)
CORS whitelist
Helmet.js security headers
Authentication:

CSRF protection
JWT with short expiry (15 min)
HTTP-only cookies
Refresh token rotation