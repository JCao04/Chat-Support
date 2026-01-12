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

## Key Configuration 
package.json (root + each app/package)
turbo.json (monorepo orchestration)
tsconfig.json (TypeScript configs)
.gitignore, .prettierrc, .eslintrc.json
.env.example (environment variables template)
docker-compose.yml (local development)

