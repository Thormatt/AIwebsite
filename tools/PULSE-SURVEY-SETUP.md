# Organization Pulse Survey - Setup Guide

## What You've Got

A complete **three-tier diagnostic suite** that reveals organizational misalignment:

1. ✅ **Individual AI Maturity Assessment** (existing `ai-assessment.html`) - CEO/VP technical baseline
2. ✅ **C-Suite Consensus** (existing `consensus-assessment.html`) - Shows where executives disagree
3. 🆕 **Organization Pulse Survey** (NEW) - Employee sentiment across 5 dimensions

## What Was Just Built

### 1. Files Created

```
/tools/
  ├── database-schema.sql          # Complete Supabase schema with RLS
  ├── pulse-survey.html            # Employee-facing survey (12 questions)
  ├── pulse-admin.html             # Admin panel to create/manage surveys
  └── pulse-results.html           # Results dashboard with charts
```

### 2. Database Schema

**Tables:**
- `organizations` - Company records
- `assessment_sessions` - Unified for all three assessment types (individual/consensus/pulse)
- `participants` - People taking surveys
- `assessment_responses` - All answers across all assessments
- `session_results` - Pre-computed results cache

**Key Features:**
- Row Level Security (RLS) policies configured
- 12 pulse survey questions pre-seeded
- Segmentation by department, level, tenure
- Access codes for shareable links

## Setup Instructions

### Step 1: Run Database Migration

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Copy the entire contents of `/tools/database-schema.sql`
4. Paste and click **Run**
5. Verify in **Table Editor** that you see:
   - organizations
   - assessment_sessions
   - participants
   - questions
   - assessment_responses
   - session_results

### Step 2: Create Your Admin Account

1. Go to your Supabase Dashboard → **Authentication**
2. Click **Add User** → **Create New User**
3. Enter your email (e.g., thor@example.com) and password
4. Confirm the user

### Step 3: Test the Flow

**Create a Survey:**
1. Open `/tools/pulse-admin.html` in browser
2. Login with your credentials
3. Fill out "Create New Pulse Survey" form:
   - Organization Name: "Test Corp"
   - Survey Title: "Q1 2025 AI Pulse"
   - Duration: 14 days
4. Click "Create Survey"
5. You'll see it appear in the list with a shareable link

**Take the Survey:**
1. Copy the survey link (it will look like: `pulse-survey.html?code=pulse_abc123xyz`)
2. Open in an incognito window (or different browser)
3. Fill out department/level info
4. Answer all 12 questions (mix of Likert scales and Yes/No)
5. Submit

**View Results:**
1. Go back to pulse-admin.html
2. Click "View Results" on your survey
3. See visualizations:
   - Overall dimension scores
   - Radar chart
   - Breakdown by department/level
   - Heatmap showing gaps

## How to Use with Clients

### The $15K-$35K Bundle: "AI Alignment Diagnostic"

**Sales Pitch:**
> "I'll run three assessments that show you the complete picture:
> 1. Where you think you are (Individual assessment)
> 2. Where your leadership team disagrees (C-Suite consensus)
> 3. What your employees actually experience (Org pulse)
>
> Then I synthesize the gaps and show you the $2M cost of misalignment."

**Pricing:**
- <100 employees: $15K
- 100-500 employees: $25K
- 500+ employees: $35K

**What They Get:**
- All three assessments run
- Thor's 20-page synthesis report
- 1-2 hour presentation
- Actionable roadmap

### Workflow

1. **CEO takes free individual assessment** → sees score → books call
2. **Thor sells bundle** → invoice → payment
3. **Thor runs assessments:**
   - Individual: CEO completes (or you run with them)
   - Consensus: Thor creates session in `consensus-admin.html`, sends links to C-Suite
   - Pulse: Thor creates session in `pulse-admin.html`, sends link to HR to distribute
4. **Collect responses** over 1-2 weeks
5. **Thor synthesizes:**
   - Export consensus results
   - Export pulse results
   - Compare with individual assessment
   - Create PowerPoint showing gaps
6. **Deliver findings** in presentation

## Key Insights This Reveals

### Example Findings:

**Misalignment #1: Perception Gap**
- CEO thinks Governance = 80% (individual assessment)
- CTO thinks Governance = 40%, CFO thinks 75% (consensus shows disagreement)
- Only 22% of employees say "I have clear guidelines" (pulse)
- **Gap cost:** Compliance risk + wasted effort

**Misalignment #2: Department Inequality**
- Engineering scores 75% on "access to AI tools"
- Sales scores 35% on same question
- **Gap cost:** Lost revenue opportunities

**Misalignment #3: Level Disconnect**
- Executives score 80% on "clear strategy"
- ICs score 30% on "I understand how AI impacts my role"
- **Gap cost:** Change resistance + failed adoption

## Customization Options

### Add More Questions

Edit `tools/database-schema.sql` lines 229-245 and add:

```sql
INSERT INTO questions (key, text, dimension, target_audience, question_type, order_index) VALUES
('pulse_your_custom', 'Your question text here', 'Culture', ARRAY['pulse'], 'likert', 13);
```

Then update `pulse-survey.html` questions array around line 92.

### Add Industries

The current pulse survey is industry-agnostic. If you want industry-specific questions:
1. Add `industry` field to `assessment_sessions` table
2. Filter questions in `pulse-survey.html` based on industry

### Segment by More Fields

Add custom segmentation (e.g., "remote vs office"):
1. Add field to `participants` table
2. Add input to `pulse-survey.html` info step
3. Update `pulse-results.html` to filter by new field

## Next Steps

### Phase 1: Test & Validate (This Week)
- [x] Run database migration
- [ ] Create admin account
- [ ] Run test survey with 3-5 fake responses
- [ ] Verify results dashboard looks good
- [ ] Practice the full client workflow

### Phase 2: First Client (Week 2-3)
- [ ] Sell first bundle using framework.html → individual assessment flow
- [ ] Run all three assessments for real client
- [ ] Manually create synthesis PowerPoint
- [ ] Deliver findings
- [ ] Collect feedback and refine

### Phase 3: Automate Synthesis (Week 4-6)
- [ ] Build synthesis report generator
- [ ] Export combined data from all three assessments
- [ ] Auto-generate PowerPoint with misalignment visualizations
- [ ] Package as downloadable bundle

### Phase 4: Scale (2-3 months)
- [ ] Add Stripe integration for self-serve bundle purchases
- [ ] Build unified dashboard showing all three assessment types
- [ ] Add historical tracking (quarterly pulses)
- [ ] White-label version for consulting partners

## Troubleshooting

### "Invalid Link" Error
- Check that access_code is correct in URL
- Verify session status is "in_progress" not "completed"
- Check expiration date hasn't passed

### "No Results Showing"
- Verify at least one participant has completed_at timestamp
- Check that responses exist in assessment_responses table
- Try refreshing results page

### RLS Policy Errors
- Make sure you're logged in as the user who created the session
- Check Supabase logs for specific RLS policy failures
- Verify user_id in assessment_sessions matches your auth.uid()

## Support

If you hit issues:
1. Check browser console for errors
2. Check Supabase Dashboard → Logs
3. Verify database schema was applied correctly
4. Make sure Supabase URL and anon key are correct in all HTML files

## Architecture Notes

- **All client-side:** No backend server needed, Supabase handles everything
- **RLS enforced:** Users can only see their own data
- **Anonymous surveys:** Pulse surveys don't require user accounts
- **Shareable links:** Access codes enable easy distribution
- **Real-time:** Results update as responses come in

This is your competitive advantage: showing clients the gap between what leadership believes and what employees experience.
