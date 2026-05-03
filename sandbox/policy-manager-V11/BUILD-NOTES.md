# Build Notes — Policy Manager

## Current State: Interactive Visual Prototype

The app is now a clickable, interactive prototype with realistic mock data, working navigation, and believable staff/manager workflows. No backend — all state is local React state with mock data.

---

## What was built (Scaffold → Prototype, April 8 2026)

### Mock Data Layer (`lib/mock-data.ts`)
- Organization: Rosslyn Veterinary Group
- 3 clinics: Rosslyn Veterinary Clinic, Tudor Glen Veterinary Hospital, Rosslyn Park Animal Hospital
- 6 users across practice_manager, manager, and staff roles
- 12 realistic policies/SOGs/communications with full body content (controlled substances, triage, surgical cleaning, client communication, scheduling, lab results, spring hours, parking closure, inventory, workplace conduct, new client onboarding, bite protocol draft)
- 14 acknowledgment records with pending/completed/overdue states
- 10 categories (Pharmacy, Clinical, Front Desk, Operations, HR & Conduct, Facilities, Client Services, Lab & Diagnostics, Inventory, Safety)

### Expanded Type System (`types/index.ts`)
- Full types for Organization, Clinic, User, PolicyItem, Acknowledgment
- Label/badge-class lookup maps for communication types and roles

### App Context (`lib/app-context.tsx`)
- React context providing current user, role detection, acknowledgment state
- `acknowledgePolicy()` action — updates state in real time
- Role switcher wired through context so the whole app reacts to user changes

### Policy Detail Page (`app/(app)/policy/[id]/page.tsx`)
- Full policy content rendering (headings, lists, tables, bold)
- Breadcrumb navigation back to library
- Type badge, status badge, version, clinic, category, dates, author
- Acknowledgment bar: shows pending (with "I Have Read & Understood" button) or completed state
- Manager actions: edit, version history, acknowledgment tracking links

### Create Policy Flow (`app/(app)/policy/new/page.tsx`)
- Full form: title, communication type, category, clinic assignment (with "All Clinics" toggle), effective/review dates, body content
- Save as Draft or Publish actions with confirmation screen
- Redirects to library on save

### Edit Policy Flow (`app/(app)/policy/[id]/edit/page.tsx`)
- Pre-populated form from existing policy data
- Same field set as create
- Save/publish confirmation with redirect to detail page

### Manager Dashboard (`app/(app)/manager/page.tsx`)
- Stat cards: published, drafts, staff count, pending acks, overdue acks
- Drafts pending review section
- Acknowledgment tracking per policy with progress bars and overdue indicators
- Filterable by clinic and communication type
- Staff compliance overview table (pending/completed/overdue per staff member)

### Updated Dashboard (`app/(app)/dashboard/page.tsx`)
- Now data-driven from mock data and current user context
- Shows required reads with inline acknowledge buttons
- Recent updates pulled from policies visible to current user's clinics
- Stat cards reflect actual acknowledgment state

### Updated Library (`app/(app)/library/page.tsx`)
- Working type filter buttons with counts
- Live keyword search across title, category, and body content
- Role-aware: staff see published only, managers see drafts too
- Clinic-filtered to current user's assigned clinics

### Updated Acknowledgments (`app/(app)/acknowledgments/page.tsx`)
- Data-driven from context — pending and completed sections
- Inline acknowledge button (updates state immediately)
- Empty states when caught up
- Links to policy detail pages

### Updated Sidebar (`components/layout/Sidebar.tsx`)
- Role-aware navigation (Manager link only shows for manager+ roles)
- Demo role switcher dropdown in sidebar
- Active state highlights for current route
- Current user avatar/name/role from context

### Updated PolicyCard (`components/ui/PolicyCard.tsx`)
- Now links to policy detail page
- Chevron indicator for clickability

---

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Public landing page |
| `/dashboard` | User dashboard (role-aware) |
| `/library` | Policy library with search & filters |
| `/acknowledgments` | Personal acknowledgment tracker |
| `/manager` | Manager dashboard & ack tracking |
| `/policy/[id]` | Policy detail with ack action |
| `/policy/new` | Create new policy |
| `/policy/[id]/edit` | Edit existing policy |

---

## Design Direction
- Kept the original clean/clinical aesthetic with Inter font
- Muted background (#f8f9fb) with white cards and subtle borders
- Purple (Policy), Cyan (SOG), Lime (Info) color coding
- Brand blue for primary actions
- Mobile-first: bottom nav on mobile, sidebar on desktop

---

## What Comes Next

### Near-term (to make this a real app)
1. **Supabase integration** — auth, database, replace mock data with real persistence
2. **Login/auth flow** — real login page, session management, route protection
3. **Real CRUD** — create/edit actually persists, version history tracking
4. **Search enhancement** — server-side search, better relevance ranking
5. **File attachments** — upload/download via Supabase Storage
6. **Reminders/notifications** — overdue acknowledgment alerts

### Medium-term
7. **Approval workflows** — draft → review → publish pipeline
8. **Review cycle management** — automated review date reminders
9. **Archive/expiry automation** — auto-archive expired Communication Info
10. **Audit log** — who changed what, when
11. **Multi-org support** — separate organizations with isolated data

### Longer-term
12. **AI policy drafting** — generate policy drafts from prompts
13. **AI search** — natural language Q&A over policy content
14. **Role-based required-read automation** — auto-assign reads by role/clinic
15. **Productization** — onboarding flow for external clinic clients
