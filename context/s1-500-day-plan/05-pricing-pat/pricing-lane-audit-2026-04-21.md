# S1 Pricing Lane Audit - 2026-04-21

## Purpose
Separate pricing files into the correct buckets so the ST-1 pricing lane can move without Developed Traffic (Dev-T).

## Core Correction
The file `Tudor_Glen_Price_Change_April_2026_1_2---a1c2c2cd-345f-4ecd-a912-0f9d70b58538.docx` is **not** an implementation-ready system output.
It is a **manual clinic-style pricing sheet** and should be treated as evidence of the current broken/manual process.

Using it as the directive list for Dawn would be incorrect and would create Dev-T.

## Correct File Classification

### A. Evidence / Problem Framing / Nathan-Justin Package
These show how clinics currently handle pricing, why drift happens, and why money is lost.

1. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source/3_Typical_Clinic_Pricing_Report_and_System---ea8718cb-a2a4-4183-9c14-766ea7cfd98b.docx`
   - Explicitly says this is a real-life example of how clinics typically review pricing today.
   - Describes manual, selective, inconsistent decision-making.
   - Fits Nathan/Justin problem framing.

2. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-3/Tudor_Glen_Price_Change_April_2026_1_2---a1c2c2cd-345f-4ecd-a912-0f9d70b58538.docx`
   - Manual comparison sheet using current price / ABVMA / 6% / suggested new price / notes.
   - Matches the “typical clinic pricing report” framing.
   - Should be used as evidence of current clinic process, not as implementation list.

3. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source/1_Price_Uplift_Campaign_-_Core_Concept---57eb07fe-6998-417e-9fa2-1aac9ab8367d.docx`
   - Core explanation of pricing drift.

4. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source/2_Revenue_Capture_and_Price_Discipline_-_Core_Thinking---9bda00c6-49cb-437d-afa6-2078f1ee475c.docx`
   - Explains hesitation, inconsistency, and lack of structure.

5. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-2/Fee_Guide_Fact_Sheet---c19698b4-cc8d-491a-a578-8def70a7cf1b.docx`
   - Explains why fee guides are lagging references, not real-time control systems.

### B. System Output / Scan Evidence
These are structured system-style outputs showing drift and quantified opportunity.

1. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source/4_VET_INC_Pricing_Alignment_Scan_-_Actual---efe117fa-9e67-48bd-b0dc-0ff077fc2bcb.docx`
   - Explicitly framed as actual clinic pricing scan output.
   - Includes total annual revenue opportunity: $26,401.03.
   - Should be treated as scan/output proof.

2. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-3/TG_Inflationary_Report---eb9be849-ff72-4d4f-b380-9c85d52b3e0f.docx`
   - Structured output showing old price, new price, delta, change %, usage/year, last updated, days since.
   - Same class of output as the RV scan.
   - Candidate source for future implementation work, but still requires verification of authority/approval path before use.

3. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-3/RV_Pricing_Report_March2026_2---a97879eb-9167-4fef-b5fa-1a07d6d80ee8.xlsx`
   - Structured scan-style output.
   - Parsed row count shows approx. 141 actionable rows plus leading blank row.
   - Candidate source for verified implementation review.

### C. System / Operating Layer / Product Framing
1. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-2/Dashboard_April_2026---0122a944-c41d-426f-a681-c0b873295047.docx`
2. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-2/Price_Report---df5e3f38-f0df-4978-b250-574e427fcf19.docx`
3. `context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-2/vet-inc-onepager---761fc982-1e95-4755-8bfa-7c3defa5e8b4.docx`

These support product/system explanation, not direct clinic execution.

### D. PAT Reference, Separate from Pricing Uplift Execution
1. `context/s1-500-day-plan/05-pricing-pat/reference/PAT-R6---d3b29646-b308-4075-813e-0dde500d757a.docx`
2. `context/s1-500-day-plan/05-pricing-pat/reference/PAT-R6_-_Copy---a21872f8-5c3d-446f-abb5-a343cd52996d.docx`
3. `context/s1-500-day-plan/05-pricing-pat/reference/Per_Average_Transaction---01854477-94d4-4949-9b73-2f3b4d6784c3.docx`
4. `context/s1-500-day-plan/05-pricing-pat/reference/Per_Average_Transaction---649ebe6d-205d-412a-87fd-534602e18615.docx`

These belong to PAT analysis and should not be mixed into the pricing-uplift execution packet.

## What This Means Operationally

### Safe conclusions now
- Dawn/TG manual sheet = evidence of manual clinic process.
- TG inflationary scan + RV pricing report = system-style scan outputs.
- No implementation directive should be issued until authority, approval route, and target list are verified.

### Next correct move
Build a fresh CSW that:
1. separates **evidence** from **implementation**
2. explains why Dawn’s sheet belongs in Nathan material
3. identifies the candidate implementation files without prematurely directing anyone to use them
4. recommends the exact verification steps needed before execution

## Dev-T Prevention Rule Applied
Do not convert a pricing artifact into an action document based only on filename.
Context classification must happen first.
