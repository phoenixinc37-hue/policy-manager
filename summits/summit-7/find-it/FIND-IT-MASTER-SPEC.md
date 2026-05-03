# FIND IT — MASTER SPEC

## Concept Brief

**Find It** is a single-clinic web app that helps staff quickly locate supplies and medications by telling them which cabinet and shelf or drawer the item is stored in.

It is not inventory management.
It is not stock control.
It is a workflow tool that reduces interruptions, wasted time, and dependence on tribal memory.

### Core problem
In a clinic, staff constantly need to know:
- where a medication is
- where a supply is stored
- which cabinet contains a needed item
- which shelf or drawer to check

Without a system, this knowledge lives in people’s heads and creates:
- interruptions
- inefficiency
- onboarding friction
- dependence on specific staff members

### Solution
Find It gives the clinic one searchable location library where a staff member can type an item name and immediately get:
- cabinet number
- shelf or drawer number
- notes if needed

### User model
- admin maintains the library
- staff search it

### Business model direction
- each clinic sets up and maintains its own library
- the product provides the structure, UI, and workflow
- setup guidance can be provided, but the clinic fills in its own content

### First use case
Search:
**Felimazole**  
Result:
- Cabinet 1
- Shelf 3

---

## Product Direction

### Scope
- single clinic app
- separate install/setup per clinic
- no cross-clinic structure in V1

### Priority item types
- supplies
- medications

### Location structure
- cabinet
- shelf or drawer

### Setup model
- text/code first
- clinics populate their own library
- designated admin edits
- staff search only

---

## MVP Structure

### Screens
1. Home / Search
2. Search Results
3. Item Detail
4. Admin Add/Edit Item
5. Browse by Cabinet
6. Admin Settings / Setup Guide

### Home / Search
- prominent search bar
- recent/common items
- quick categories

### Search Results
- matching items
- aliases
- clean list view

### Item Detail
- item name
- category
- cabinet number
- shelf/drawer number
- notes
- aliases

### Admin Add/Edit Item
- item name
- aliases
- category
- cabinet
- shelf/drawer
- notes

### Browse by Cabinet
- cabinet list
- drill into shelf/drawer contents

### Admin Settings / Setup Guide
- naming guidance
- category setup
- cabinet conventions

---

## MVP Features

### Must-have
- search by item name
- partial match
- aliases
- item detail page
- cabinet + shelf/drawer location
- admin add/edit item
- browse by cabinet
- simple categories

### Can wait
- photos
- barcode/QR
- voice
- analytics
- stock counts
- reorder logic
- multi-clinic support

---

## Technical Direction

### Build approach
- web app
- simple searchable data structure
- designed for fast setup and low friction

### Recommended stack
- Next.js
- Tailwind CSS
- lightweight data layer first
- structured backend later as needed

---

## First Clinic Seed
- Rosslyn

## Product Thesis
Find It turns location knowledge from tribal memory into a searchable clinic workflow system.

Instead of asking a person where something is, staff can search the system and get a direct answer.
