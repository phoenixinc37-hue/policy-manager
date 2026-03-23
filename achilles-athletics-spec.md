# ACHILLES ATHLETICS APP SPEC
## Virtual Athlete Logbook

---

## APP NAME
**Achilles Athletics**
Tagline: "Move Forward"

---

## CORE CONCEPT
A virtual logbook where athletes perform assigned drills, log results in specific "zones," and track improvement over time. Focus on feedback loop: result → analyze → improve.

---

## USER ROLES

### 1. ATHLETE
- Login to personal dashboard
- View assigned drills/workouts
- Log results for each drill
- Track progress over time (charts)
- View goals and progress toward them

### 2. COACH
- Create/edit athlete profiles
- Create drills with specific zones/goals
- Assign drills to athletes
- View athlete progress
- Manage all assigned athletes

### 3. ADMIN (Scott)
- Full access
- Manage coaches
- View all data
- Analytics across all athletes

---

## KEY FEATURES

### 1. LOGIN/ONBOARDING
- Email + password (simpler for now)
- Or: coach-provided invite code
- First login: set goals

### 2. ATHLETE DASHBOARD
- Today's assigned drills
- Quick stats (streak, last workout)
- Progress toward goals
- Recent results

### 3. DRILL LIBRARY
- Drill name
- Description/instructions
- Video link (optional)
- Target zone(s) - the goal area
- How to measure success

### 4. ZONES (The Core Concept)
Each drill has specific zones to hit:
- **Red Zone** = primary target (e.g., back of cage, above certain height)
- **Yellow Zone** = secondary
- **Green Zone** = baseline

Example: Batting drill
- Red Zone: 10+ feet high, above pitcher/2nd base
- Yellow Zone: 5-10 feet
- Green Zone: contact made

### 5. RESULT LOGGING
- Select drill
- Enter results (zone hit: red/yellow/green/none)
- Add notes (how it felt, what changed)
- Date/time auto-captured

### 6. TRACKING & CHARTS
- Results over time
- Zone distribution (pie chart)
- Streak tracking
- Goal progress

### 7. COACH DASHBOARD
- List of assigned athletes
- Assign new drills
- View athlete progress
- Add notes to athlete entries

---

## EXAMPLE DRILL
**Drill:** T-Stand Batting
**Instructions:** Take 10 swings off tee, aim for red zone
**Zones:**
- Red: Ball lands 10+ feet, above pitcher height
- Yellow: 5-10 feet
- Green: Contact made
- Miss: No contact

**Athlete logs:**
- Date: March 20
- Swings: 10
- Red: 4
- Yellow: 3
- Green: 2
- Miss: 1
- Notes: "Felt good, need to keep hands inside"

---

## TECH STACK (RECOMMENDED)

### Option A: No-Code (Fastest)
- **Glide Apps** or **Softr** 
- Connect to Google Sheets
- $20-50/month
- Live in ~1 week

### Option B: Custom (Most Flexible)
- Frontend: React/Next.js (mobile-first)
- Backend: Supabase or Firebase
- Hosting: Vercel
- ~2-4 weeks development

---

## PHASE 1 MVP (Build First)
1. ✅ Athlete login
2. ✅ Coach creates drill
3. ✅ Athlete logs result (zone hit)
4. ✅ Simple chart showing progress
5. ✅ Coach assigns drill to athlete

---

## DATA STRUCTURE

### Athlete
- id, name, email, sport, age, goals, coach_id

### Drill
- id, name, description, zones (json), coach_id

### AthleteDrill (assignment)
- id, athlete_id, drill_id, assigned_date, status

### Result
- id, athlete_id, drill_id, date, zone_hit, notes

---

## QUESTIONS TO ANSWER
1. How many athletes initially? (pilot)
2. What sports? (hockey, baseball, softball first?)
3. Who builds the first drills?
4. iOS app or responsive website first?

---

## NEXT STEP
Decide: No-code (fast) vs Custom (flexible)
