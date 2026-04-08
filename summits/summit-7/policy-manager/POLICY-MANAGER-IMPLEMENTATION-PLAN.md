# POLICY MANAGER — IMPLEMENTATION PLAN

## Goal
Move Policy Manager from product definition into active construction of an initial usable web app.

## Current Status
Product definition complete enough to begin construction.

Completed:
- Concept brief
- App sections / screen map
- Homepage-style pitch
- MVP scope
- Technical architecture
- Database schema (high-level)
- Role & permission matrix
- Exact MVP build sequence

## Build Objective
Produce an initial working web app prototype shortly, with the following first-use capabilities:
- secure login
- role-based shell
- core navigation
- clinic-aware data model
- policy library
- create/edit policy flow
- communication type tagging
- search
- acknowledgment tracking

## Recommended Stack
- Next.js
- Tailwind CSS
- Supabase Auth
- Supabase Database
- Supabase Storage
- Vercel deployment

## Construction Phases

### Phase 1 — Foundation
Deliverables:
- app scaffold
- environment config
- auth setup
- base layout
- protected routes

### Phase 2 — Data Layer
Deliverables:
- schema definitions
- seed data model
- organization / clinic / user structure
- policy items / categories / versions / acknowledgments

### Phase 3 — Core Product Experience
Deliverables:
- staff dashboard
- manager dashboard
- policy library
- policy detail page
- search
- create/edit policy flow

### Phase 4 — Control Layer
Deliverables:
- acknowledgment tracker
- clinic management
- user management
- category management
- archive / expiry controls

### Phase 5 — Internal Beta Readiness
Deliverables:
- seeded clinic examples
- sample policy content
- mobile cleanup
- dashboard clarity improvements
- test pass on main flows

## Immediate Construction Tasks
1. Create project/app folder for Policy Manager
2. Initialize Next.js app
3. Install and configure Tailwind
4. Connect Supabase project structure
5. Define initial schema files
6. Build auth and protected layout
7. Build dashboard shell
8. Build policy library and detail view
9. Build create/edit policy workflow
10. Build acknowledgment tracking

## What Scott should expect next
Shortly, the next visible milestone should be:
- an initial app shell
- clickable navigation
- first working screens
- early content/data structure

## Standard
The initial version does not need to be polished SaaS perfection.
It does need to be:
- structurally correct
- aligned to the spec
- expandable without rework
- usable enough to test with real clinic thinking
