# Policy Manager

The operating system for clinic policy, guidance, and internal communication.

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend (planned):** Supabase (Auth, Database, Storage)
- **Deployment (planned):** Vercel

## Structure

```
app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles + design system
│   └── (app)/              # Authenticated app routes
│       ├── layout.tsx      # App shell with sidebar
│       ├── dashboard/      # Dashboard overview
│       ├── library/        # Policy library browser
│       └── acknowledgments/# Acknowledgment tracker
├── components/
│   ├── layout/             # Navigation, sidebar
│   └── ui/                 # Reusable cards, headers
├── types/                  # TypeScript types
└── lib/                    # Utilities (future)
```

## Communication Types

Policy Manager organizes content into three types:

- **Administrative Policy** — mandatory standards, top-down, no variance
- **Standard Operating Guideline (SOG)** — principle-based operational guidance
- **Communication Info** — FYI, temporary, or expiring reference material
