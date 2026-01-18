# THYPE - Strategic Management System

## Overview

THYPE is a strategic management platform with AI capabilities designed for construction companies. The system provides role-based dashboards for different user types (Master Admin, Managers, and Brokers), real estate partner relationship management, KPI tracking, and interaction logging.

The application is a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence. It features a modern, premium dark-themed UI with gold accents inspired by luxury branding.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, React Context for auth state
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: TailwindCSS v4 with custom theme variables for luxury dark aesthetic
- **Charts**: Recharts for data visualization

The frontend follows a role-based layout system:
- `MobileLayout` - Bottom tab navigation for broker/admin/manager mobile views
- `DashboardLayout` - Sidebar navigation for desktop master/manager dashboards

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Style**: RESTful JSON API endpoints under `/api/`
- **Build**: esbuild for production bundling with selective dependency bundling

### Authentication System
- Session-based authentication using `express-session` with memory store
- Passport.js with Local Strategy for username/password authentication
- Password hashing using Node.js crypto scrypt
- Role-based access control (master, manager roles)

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`
- **Migrations**: Drizzle Kit for schema management (`db:push` command)

### Database Schema
Core entities:
- `users` - System users with roles (master/manager)
- `realEstatePartners` - Partner companies/brokers with classification tiers
- `interactions` - Logged interactions between managers and partners
- `partnerMetrics` - Performance metrics per partner

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # UI components (shadcn/ui based)
│   ├── pages/           # Route pages (app/, admin/, manager/)
│   ├── contexts/        # React contexts (AuthContext)
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities and API client
│   └── mock/            # Mock data for development
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   ├── auth.ts          # Authentication setup
│   ├── storage.ts       # Database access layer
│   └── db.ts            # Database connection
├── shared/              # Shared code
│   └── schema.ts        # Drizzle schema definitions
└── migrations/          # Database migrations
```

## External Dependencies

### Database
- **PostgreSQL** - Primary database (requires `DATABASE_URL` environment variable)
- **Drizzle ORM** - Database toolkit for TypeScript
- **connect-pg-simple** - PostgreSQL session store (available but memory store used by default)

### Authentication
- **Passport.js** - Authentication middleware
- **passport-local** - Local username/password strategy
- **express-session** - Session management
- **memorystore** - In-memory session storage

### Frontend Libraries
- **@tanstack/react-query** - Server state management
- **Radix UI** - Accessible UI primitives (full suite)
- **Recharts** - Charting library
- **Lucide React** - Icon library
- **date-fns** - Date utilities
- **wouter** - Routing
- **vaul** - Drawer component
- **embla-carousel-react** - Carousel component
- **cmdk** - Command palette

### Development Tools
- **Vite** - Frontend build tool with HMR
- **esbuild** - Production bundler for server
- **tsx** - TypeScript execution for development
- **Drizzle Kit** - Database migration tool

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal** - Error overlay
- **@replit/vite-plugin-cartographer** - Development tooling (dev only)
- **@replit/vite-plugin-dev-banner** - Development banner (dev only)