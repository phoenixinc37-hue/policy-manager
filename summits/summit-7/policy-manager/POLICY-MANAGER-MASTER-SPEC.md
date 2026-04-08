# POLICY MANAGER — MASTER SPEC

## 1. Concept Brief

**Policy Manager** is a multi-clinic web app built to help veterinary clinic leadership create, organize, issue, track, and maintain policy, operational guidance, and internal communication in one structured system.

### Core problem
Most clinics do not have a clean process to:
- create policy
- implement policy
- confirm staff read it
- file it properly
- review whether it is current
- manage it across multiple clinics

Instead, policies and operational direction live in:
- email
- shared drives
- chats
- binders
- random documents
- manager memory

That creates inconsistency, weakens follow-through, slows onboarding, and makes multi-clinic management messy.

### Primary users
- practice managers
- manager groups
- clinic leadership teams
- clinic owners
- operations/admin leaders

### Secondary users
- staff who need to read, search, and acknowledge policies
- future outside clinic clients when productized

### The solution
Policy Manager gives management one place to:
- create policy
- issue guidance
- categorize communication
- assign content to one or many clinics
- track acknowledgment
- keep current-version truth visible

It gives staff one place to:
- search
- read
- confirm they saw it
- use it as operational support

### Three communication types

**Administrative Policy**
- black-and-white direction
- top-down
- little or no variance
- mandatory standards/rules

**Standard Operating Guideline (SOG)**
- principle-based operational guidance
- helps team members make the right decision
- created by management
- directional, not always rigid

**Communication Info**
- FYI or temporary info
- expiring or reference-style material
- useful for awareness, not necessarily standing policy

### Why this matters
This is not just document storage. It is an operational consistency system.

It improves:
- clarity
- implementation
- accountability
- onboarding
- multi-clinic consistency
- access to current information

### Strategic fit
- beta tested in your clinics first
- productized outward quickly after internal proof
- likely long-term module inside AMS / broader clinic ops stack

---

## 2. App Sections / Screen Map

### Staff-side core screens
- Login
- Dashboard
- Policy Library
- Search
- Policy Detail
- My Required Reads
- My Acknowledgments

### Manager-side core screens
- Manager Dashboard
- Create Policy
- Edit Policy
- Acknowledgment Tracking
- Category Management
- Clinic Management
- User & Role Management
- Version History
- Archive / Expiry
- Audit / Review View

### Core navigation
- Dashboard
- Library
- Search
- Acknowledgments
- Clinics
- Users
- Reports
- Settings

### Key screen purposes

**Dashboard**
- unread items
- recent updates
- required reads
- quick search
- manager overdue items

**Policy Library**
- browse everything by clinic/category/type/status

**Search**
- keyword + filtered lookup for real operational use

**Policy Detail**
- title
- type
- clinic(s)
- category
- version
- effective date
- review date
- body
- attachments
- acknowledgment button

**Create/Edit Policy**
- choose type
- assign clinic(s)
- assign category
- write body
- add attachments
- publish/save draft
- effective/review/expiry dates

**Acknowledgment Tracking**
- who read it
- who hasn’t
- overdue confirmations
- by clinic / by role

**Archive / Expiry**
- especially for Communication Info so stale items don’t clog the system

---

## 3. Homepage-Style Pitch

**Policy Manager**  
**The operating system for clinic policy, guidance, and internal communication.**

Create, organize, issue, and track policy across one clinic or many — with clear acknowledgment, better consistency, and one place your team can trust for the current answer.

### The pain
Most clinics don’t have a policy system. They have policy clutter.

Important direction gets buried in:
- emails
- shared drives
- chats
- binders
- random docs
- people’s memory

### The result
- inconsistency
- confusion
- weak accountability
- poor onboarding
- no visibility into who read what
- stale info staying alive too long

### The promise
Policy Manager gives leadership teams one place to:
- create policy
- manage guidance
- organize communication
- track acknowledgment
- support multiple clinics
- maintain a searchable source of truth

### Why it’s different
It separates communication into:
- Administrative Policy
- Standard Operating Guideline
- Communication Info

That distinction is one of the strongest parts of the product.

### Outcome
Instead of asking:
- where is that document?
- what did we decide?
- did anyone read this?
- is this still current?

your clinic has one operational system for the answer.

---

## 4. MVP Scope

### Must-have
- login
- role-based access
- multi-clinic architecture
- policy library
- communication type tagging
- categories/tags
- create/edit policy
- search
- acknowledgment tracking
- manager dashboard
- version history
- archive/expiry logic

### Nice-to-have but likely Phase 2
- approval workflows
- quizzes/training checks
- AI policy drafting
- AI Q&A search
- role-based required-read automation
- reminders/review cycles

---

## 5. Technical Architecture

### Stack
- **Frontend / App UI:** Next.js
- **Hosting / Deployment:** Vercel
- **Backend / Database / Auth / Storage:** Supabase
- **Styling/UI layer:** Tailwind + component system
- **Future AI layer:** added later after data structure is clean

### High-Level Architecture Flow
- Next.js handles UI, dashboards, screens, and responsive experience
- Supabase handles auth, database, file storage, and access rules
- Vercel handles hosting and deployment
- Supabase Storage handles attachments and uploaded files

### Core System Design
- Organization Layer
- Clinic Layer
- User Layer
- Content Layer
- Tracking Layer

---

## 6. Database Schema — High Level

### Core entities
- organizations
- clinics
- users
- user_clinics
- roles
- user_roles
- communication_types
- categories
- policy_items
- policy_item_clinics
- policy_item_categories
- policy_versions
- policy_attachments
- acknowledgments

### Key relationships
- one organization has many clinics
- one clinic has many users
- one policy item can belong to one or many clinics
- one policy item has one communication type
- one policy item can have many categories/tags
- one policy item can have many versions
- one policy item can have many acknowledgments
- one user can acknowledge many policy items

---

## 7. Role & Permission Matrix

### Owner
Can:
- view all clinics
- view all policy items
- search all content
- view all acknowledgments
- view reports/audit views
- manage org-level settings
- manage users and roles
- manage clinics
- create/edit/publish/archive policy

### Admin
Can:
- manage users
- manage clinic setup
- manage categories
- create/edit/publish/archive policy
- assign content to clinics
- view acknowledgment tracking
- manage archive/expiry
- view version history
- access reports/audit screens

### Practice Manager
Can:
- create policy
- edit policy
- publish policy
- assign to one or more clinics they control
- manage acknowledgments
- search/view all assigned content
- manage categories if allowed
- view review/audit screens
- archive/expire communication items

### Manager
Can:
- create draft policy
- edit assigned content
- publish if permission granted
- search/view content
- view acknowledgment results for assigned clinics/content
- create Communication Info
- create SOGs
- possibly create Administrative Policy depending on org rule

### Staff
Can:
- log in
- search/view assigned content
- browse library
- read policy/SOG/info
- acknowledge required items
- view own pending/completed acknowledgments

### Read-Only
Can:
- search/view assigned content

### Governance rule
- **Administrative Policy:** publish only by Owner / Admin / Practice Manager
- **SOG:** publish by Practice Manager / Manager+
- **Communication Info:** publish by Manager+

---

## 8. Exact MVP Build Sequence

### Step 1 — Project Foundation
Build:
- Next.js app shell
- Vercel deployment base
- Supabase project
- auth setup
- UI framework
- basic navigation layout

### Step 2 — Core Data Structure
Build:
- organizations
- clinics
- users
- roles
- user-clinic relationships
- communication types
- categories
- policy items
- versions
- acknowledgments

### Step 3 — Role & Access Logic
Build:
- role-permission rules
- route protection
- screen visibility by role
- staff vs manager vs admin access logic

### Step 4 — Content Creation Engine
Build:
- create policy screen
- edit policy screen
- communication type selection
- category assignment
- clinic assignment
- draft/publish status
- version creation logic

### Step 5 — Staff Consumption Experience
Build:
- staff dashboard
- policy library
- search
- policy detail page
- acknowledgment button/flow
- my acknowledgments page

### Step 6 — Manager Control Experience
Build:
- manager dashboard
- acknowledgment tracker
- filter by clinic/type/category
- archive/expiry controls
- version history view

### Step 7 — Admin/Org Control
Build:
- clinic management
- user management
- category management
- role assignment screen

### Step 8 — Seed Data + Internal Beta
Build/load:
- sample clinics
- sample users
- sample categories
- sample policy items
- sample SOGs
- sample communication info

### Step 9 — Polish & Cleanup
Refine:
- mobile responsiveness
- empty states
- UI consistency
- badge system for content types
- dashboard clarity
- search refinement

### Step 10 — Real Usage Loop
Do:
- internal testing in your clinics
- gather feedback
- fix friction
- identify missing features
- tighten permission rules

---

## 9. Construction Kickoff Plan

### Immediate next actions before code build
1. Save and lock the master spec
2. Create the implementation task list
3. Create project folder structure for the app
4. Start scaffold for Next.js + Supabase app
5. Build Phase 1 foundation

### Definition of ready for construction
Policy Manager is ready for construction when these are locked:
- concept
- screen structure
- architecture
- schema
- permission model
- build order

That threshold is now met.
