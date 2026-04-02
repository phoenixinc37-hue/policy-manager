# AMS — Feature Requirements
*Filed: April 2, 2026 — Kate*
*Owner: Jack Wilde — development*

---

## Feature 1 — AI Incident Clarifier
**Problem:** Clinic staff write jumbled, unclear incident notes. Management can't quickly understand what happened.
**Solution:** AI agent that takes raw incident text and returns a plain-language summary.
**Example:** Rosslyn incident Mar 27 — groomer Ogie Senic, client discount issue, DP approval question
**Priority:** Medium

---

## Feature 2 — Problem Client Tracking
**Problem:** Problem clients have no system-level flag. Staff don't know history at booking or check-in.
**Solution:**
- Flag problem clients in PMS with notes/history
- Alert at booking and check-in: "This client has a flagged history"
- Options: refuse service, require payment up front, assign to senior staff
**Priority:** High

---

## Feature 3 — Discount Management & Oversight
**Problem:** Discounts are being applied with no clear approval trail. "DP approvals" appearing without documentation.
**Solution:**
- Every discount requires: who approved, when, reason, expiry
- Discount registry — searchable list of all active discounts per clinic
- Parameters per clinic (e.g. max % without CEO approval)
- Alerts when discounts outside parameters are applied
**Example issue:** Client at Rosslyn had 25% off services + 10% off inventory — "as per DP" — no documented approval
**Priority:** High

---

## Feature 4 — EOD Process Automation
**Problem:** Staff manually sending multiple EOD reports (period totals, cashout counter, deposit slips) — unclear if anyone uses them
**Solution:** Jack builds automated EOD reporting into AMS — only what's actually needed, automated, no manual sending required
**Status:** Under review — team survey sent Apr 2 to determine what's actually used
**Priority:** Medium

---

*Add new requirements below as they come in*
