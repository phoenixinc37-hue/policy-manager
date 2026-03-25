# Daily / CSI Management System — Analysis
**Date:** March 24, 2026
**Prepared by:** Kate

---

## What It Is

Daily is a **WordPress theme/plugin** (built on the _s starter theme) that runs as an internal management system for the clinics. It's PHP-based, uses WordPress as the backend, and stores data in a MySQL database.

## Current Features (What It Already Does)

| Feature | File | Notes |
|---|---|---|
| Staff Scheduler | page-scheduler.php / page-clinic-scheduler.php | Calendar-based shift scheduling, clinic filtering (TG/RV/ROSS) |
| Time Clock | page-time-clock.php / function-timeclock.php | Staff clock in/out |
| Time Requests | page-timerequest.php | Staff submit time-off requests |
| Holiday Requests | page-holiday-requests.php | Holiday/vacation requests |
| OT Approval | page-otapproval.php | Overtime approval workflow |
| Payroll | page-payroll.php / function-payroll.php | Payroll calculations |
| My Hours | page-myhours.php | Individual hours tracking |
| Sales | page-sales.php / function-sales.php | Sales tracking |
| Stats | page-stats.php / function-stats.php / page-archive-stats.php | Performance statistics |
| Messages | page-messages.php / function-message.php | Internal messaging |
| Open Shifts | page-openshifts.php | Open shift management |
| Missed Shifts | page-missedshifts.php | Missed shift tracking |
| Vet Lineup | page-vet-lineup.php | Vet scheduling/lineup |
| Vet Worksheet | page-vet-worksheet.php / function-vetworksheet.php | Vet worksheets |
| DR Schedule | page-drschedule.php | Doctor scheduling |
| Resources | page-resources.php | Resource management |
| Deposits | page-deposit.php / function-deposits.php | Deposit tracking |
| Profit Share Calc | page-calc-share.php | Profit share calculator (Kat's profit share?) |
| Service Requests | page-service-request.php | Service request management |
| Core/Booking Stats | page-core.php / page-booking-stats.php | Core stats and booking data |
| User List | page-user-list.php | Staff/user management |
| Tender | page-tender.php | Cash tender tracking |
| Float | part-float.php / page-pf-totals-update.php | Float counting |

---

## Assessment

**This is already a substantial system.** Someone (likely Jack or previous developer) built a full internal clinic management platform. It covers scheduling, timekeeping, payroll, sales, stats, and messaging. This is not a rough prototype — it has 40+ files and real functionality.

**The platform:** WordPress + PHP + MySQL. Old school but solid. Runs anywhere with a web server.

---

## The Vision: HR Hub

To turn Daily into the HR Hub for the 500 Day Plan, here's what I'd recommend:

### What to Keep (Already Built)
- Scheduler ✅
- Time clock / time requests / OT approval ✅
- Payroll ✅
- Stats / performance tracking ✅
- Messaging ✅

### What to Add for the HR Hub Vision

1. **Policy Manager integration** — embed the Policy Manager we just built into Daily, so policies/SOGs/memos are accessible from the same system staff already use

2. **Accountability dashboard** — track individual performance metrics (production per vet, service delivery, etc.) visible to managers

3. **Performance reviews** — structured check-in process built into the system

4. **Onboarding workflow** — new staff get assigned policies to read, sign off, track completion

5. **Incident/issue tracking** — replace ad hoc emails with structured incident reporting

6. **AI layer (Kate)** — morning report auto-generated from the previous day's data, flags to management, anomaly detection

---

## Two Options

**Option A: Extend Daily**
Build the HR Hub features into the existing WordPress/PHP system. Fast, keeps staff in a familiar environment. Downside: WordPress/PHP is dated tech, harder to modernize.

**Option B: Rebuild in Next.js (modern stack)**
Use Daily as the spec, rebuild in the same stack as Policy Manager (Next.js + Supabase). Cleaner, mobile-first, easier to extend, cloud-deployable. Downside: more work upfront.

**My recommendation:** **Option B** — but migrate incrementally. Launch Policy Manager first (already built), then port the key Daily features one by one. Staff transition is gradual, nothing breaks.

---

## Connection to 500 Day Plan

Daily + Policy Manager + Clinic IQ together = the operational backbone of the 500 Day Plan:
- **Clinic IQ** — revenue optimization (pricing, rebates)
- **Policy Manager** — governance and compliance
- **Daily/HR Hub** — people management (scheduling, performance, accountability)

That's the full system. 🐺
