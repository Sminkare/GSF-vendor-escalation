# GSF Vendor Escalation Workflow Tool - Plan of Action

**Version:** 1.0  
**Last Updated:** April 15, 2026  
**Owner:** Sminkare@amazon.com

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Phase 1: Pilot Launch](#phase-1-pilot-launch)
3. [Phase 2: Full Rollout](#phase-2-full-rollout)
4. [Phase 3: Expansion to Other Teams](#phase-3-expansion-to-other-teams)
5. [Time Savings Analysis](#time-savings-analysis)
6. [Tool Support Team](#tool-support-team)
7. [Technology Justification](#technology-justification)

---

## Executive Summary

**Objective:** Deploy a standalone vendor escalation workflow tool to reduce manual overhead, improve vendor communication tracking, and provide real-time analytics for GSF Procurement teams.

**Current State:** Team spends 25-45 minutes per ticket across manual systems, email composition, and reporting.

**Target State:** Reduce to 10-15 minutes per ticket using centralized tool with automated workflows.

**Expected Impact:** 50-70% time savings = 4-26 hours per week freed up for strategic work.

**Timeline:** 5 weeks from pilot to full GSF rollout, with ongoing expansion to other teams.

**Investment:** ~$5-10/month AWS hosting + one-time 5-10 hours training/support time.

---

## Phase 1: Pilot Launch

### Timeline: Weeks 1-2

### Week 1: Final Deployment & UAT Testing

**Days 1-2: Production Deployment**

- **Owner:** Developer (Sminkare)
- **Tasks:**
  - Deploy application to AWS Amplify production environment
  - Configure production database/storage
  - Verify all features functional in production
  - Test email sending functionality
  - Load sample tickets for testing
  - Configure analytics dashboards
- **Success Criteria:**
  - ✅ Application accessible at production URL
  - ✅ All features working without errors
  - ✅ Email templates rendering correctly
  - ✅ Analytics displaying test data

**Days 3-5: User Acceptance Testing**

- **Owner:** GSF SME + Developer
- **Tasks:**
  - GSF subject matter expert walks through realistic scenarios
  - Test ticket creation and management workflows
  - Validate email templates match current processes
  - Review analytics for accuracy
  - Document feedback and required changes
  - Developer implements critical fixes
- **Success Criteria:**
  - ✅ GSF SME signs off on workflows
  - ✅ Email templates approved
  - ✅ No critical bugs identified
  - ✅ Analytics meet reporting needs

**Deliverables:**

- ✅ Live production application
- ✅ UAT test report
- ✅ Quick reference guide (1-page)
- ✅ Training materials prepared

**Hours Required:**
| Role | Hours | Notes |
|------|-------|-------|
| Developer | 8-10 hours | Deployment + UAT support |
| GSF SME | 3-4 hours | Workflow validation |
| IT Support | 2-3 hours | AWS setup assistance |
| **Total** | **13-17 hours** | One-time investment |

---

### Week 2: Pilot Launch with GSF Soft Services

**Day 1: Training Session**

- **Format:** Live 1-hour training session
- **Attendees:** 2-3 pilot users + team lead
- **Agenda:**
  1. Tool overview (10 min)
  2. Ticket management walkthrough (15 min)
  3. Communication & email features (15 min)
  4. Analytics dashboard (10 min)
  5. Hands-on practice + Q&A (10 min)
- **Materials:**
  - Live demo access
  - Quick reference guide (PDF)
  - FAQ document
  - Support contact info

**Days 2-5: Active Pilot**

- **Pilot Users:** 2-3 GSF Soft Services team members
- **Expected Volume:** Process 10-20 real tickets through the tool
- **Daily Check-ins:** 15-minute Slack/email check-ins for first 3 days
- **Support:** Developer available for quick questions/fixes

**Day 5: Pilot Retrospective**

- **Format:** 30-minute feedback session
- **Topics:**
  - What's working well?
  - What's confusing or difficult?
  - What features are missing?
  - Would you recommend to full team?
- **Output:** Prioritized list of improvements for Week 3

**Deliverables:**

- ✅ 3 trained pilot users
- ✅ 10-20 tickets processed
- ✅ Feedback report with recommendations
- ✅ Pilot success/go-no-go decision

**Hours Required:**
| Role | Hours | Notes |
|------|-------|-------|
| Developer | 6-8 hours | Training + daily support |
| Pilot Users | 1 hour each | Training attendance |
| Team Lead | 2 hours | Training + retrospective |
| **Total** | **11-15 hours** | Distributed across team |

**Success Metrics:**

- ✅ **User Satisfaction:** 4+/5 rating from pilot users
- ✅ **Time per Ticket:** 15 minutes or less (vs. 30+ min baseline)
- ✅ **Adoption Rate:** 80%+ of pilot users actively using tool
- ✅ **Bug Count:** < 3 critical bugs identified

---

## Phase 2: Full Rollout

### Timeline: Weeks 3-4

### Week 3: Refinements & Team Expansion Prep

**Days 1-3: Address Pilot Feedback**

- **Owner:** Developer
- **Tasks:**
  - Fix any bugs identified in pilot
  - Implement high-priority feature requests
  - Update email templates based on feedback
  - Refine analytics dashboards
  - Update documentation
- **Priority Focus:**
  - Critical: Bugs preventing use
  - High: Features that save significant time
  - Medium: Nice-to-have improvements
  - Low: Future enhancements (backlog)

**Days 4-5: Prepare for Full Rollout**

- **Owner:** Team Lead + Developer
- **Tasks:**
  - Schedule training for remaining team members
  - Prepare communication announcing full rollout
  - Create success stories from pilot users
  - Update quick reference guide based on pilot learnings
  - Set up weekly office hours for ongoing support

**Deliverables:**

- ✅ Updated application (v1.1)
- ✅ Revised training materials
- ✅ Rollout communication drafted
- ✅ Support schedule published

**Hours Required:**
| Role | Hours | Notes |
|------|-------|-------|
| Developer | 8-12 hours | Bug fixes + enhancements |
| Team Lead | 3-4 hours | Rollout planning |
| **Total** | **11-16 hours** | |

---

### Week 4: Full GSF Soft Services Rollout

**Days 1-2: Team Training**

- **Format:** 2-3 training sessions (1 hour each) to accommodate schedules
- **Attendees:** All remaining GSF Soft Services team members
- **Content:** Same as pilot training + lessons learned from pilot
- **Support:** Pilot users attend to share experiences

**Days 3-5: Full Team Adoption**

- **Target:** 100% of tickets processed through tool
- **Support:**
  - Daily Slack check-ins (15 min)
  - Weekly office hours (30 min, Wed 2-2:30pm)
  - Email support with < 4-hour response time
- **Monitoring:**
  - Track adoption metrics daily
  - Identify users who need extra help
  - Celebrate quick wins in team chat

**End of Week 4: Full Rollout Review**

- **Format:** 1-hour team meeting
- **Topics:**
  - Review analytics: time savings, ticket volume, trends
  - Discuss any remaining challenges
  - Identify process improvements
  - Plan for sustained adoption
- **Decision Point:** Proceed to expand to other teams?

**Deliverables:**

- ✅ Entire GSF Soft Services team trained
- ✅ 100% of new tickets in system
- ✅ Week 4 metrics report
- ✅ Expansion readiness assessment

**Hours Required:**
| Role | Hours | Notes |
|------|-------|-------|
| Developer | 6-8 hours | Training + support |
| Team Members | 1 hour each | Training attendance |
| Team Lead | 4-5 hours | Training + team meeting |
| **Total** | **15-20 hours** | Distributed across team |

**Success Metrics:**

- ✅ **Adoption Rate:** 90%+ of team using tool daily
- ✅ **Ticket Coverage:** 100% of new tickets in system
- ✅ **Time Savings:** Documented 40%+ reduction in time per ticket
- ✅ **User Satisfaction:** 4+/5 team average rating

---

## Phase 3: Expansion to Other Teams

### Timeline: Week 5 and Beyond

### Target Teams for Expansion

**Phase 3A: Other Non Grocery Teams** (Weeks 5-8)

- **Teams:** Facilities Operations, Maintenance Coordination, etc.
- **Timeline:** 4 weeks (mirror GSF rollout)
- **Customization Needed:**
  - Update email templates for team-specific language
  - Adjust ticket categories/fields
  - Customize analytics for team priorities
- **Resources:**
  - 1 week developer time for customization
  - 1-2 team SMEs for requirements/UAT
  - Same training process as GSF

**Phase 3B: Other Procurement Teams** (Weeks 9-12)

- **Teams:** Other Amazon procurement groups with vendor management needs
- **Approach:**
  - Deploy separate instance per team (or shared with team filtering)
  - Reuse proven training materials
  - Leverage GSF success stories
- **Scalability:**
  - Minimal developer time after initial templates established
  - Each team can self-serve after initial deployment

### Expansion Success Factors

✅ **GSF Soft Services success stories** - demonstrate value  
✅ **Documented time savings** - ROI justification  
✅ **Low resource requirements** - easy to approve  
✅ **Proven training process** - predictable rollout  
✅ **Flexible architecture** - adapts to team needs

**Estimated Ongoing Support:**

- **Per New Team:** 15-20 hours (customization + training)
- **Monthly Maintenance:** 2-4 hours (bug fixes, minor enhancements)
- **Quarterly Reviews:** 2 hours (gather feedback, prioritize roadmap)

---

## Time Savings Analysis

### Current State (Manual Process)

**Average Time per Ticket: 25-45 minutes**

Breakdown:

- 🕐 5-10 min: Find and open ticket in multiple systems
- 🕐 5-10 min: Look up vendor contact info and previous communications
- 🕐 5-10 min: Find email template, customize, add ticket details
- 🕐 5-10 min: Update ticket status in tracking system
- 🕐 5 min: Document action in team log
- **Total:** 25-45 minutes per ticket

**Weekly Volume: 20-50 tickets**  
**Weekly Time Burden: 8.3 - 37.5 hours**

**Annual Impact:**

- Low volume (20 tickets/week): 8.3 hrs/week × 52 weeks = **432 hours/year**
- High volume (50 tickets/week): 37.5 hrs/week × 52 weeks = **1,950 hours/year**

---

### Future State (With Tool)

**Average Time per Ticket: 10-15 minutes**

Breakdown:

- ⚡ 2 min: Select ticket (auto-populated queue)
- ⚡ 3 min: Review details (all info on one screen)
- ⚡ 2 min: Take action (one-click workflow)
- ⚡ 3-5 min: Send email (pre-filled template, auto-saves)
- ⚡ 0 min: No manual status update needed (automatic)
- **Total:** 10-15 minutes per ticket

**Weekly Time with Tool: 3.3 - 12.5 hours**

---

### Time Savings Calculation

| Scenario                            | Current Time | Tool Time | **Savings per Week** | **Savings per Year** |
| ----------------------------------- | ------------ | --------- | -------------------- | -------------------- |
| **Low Volume** (20 tickets/week)    | 8.3 hrs      | 3.3 hrs   | **5 hours**          | **260 hours**        |
| **Medium Volume** (35 tickets/week) | 20.4 hrs     | 7.3 hrs   | **13.1 hours**       | **681 hours**        |
| **High Volume** (50 tickets/week)   | 37.5 hrs     | 12.5 hrs  | **25 hours**         | **1,300 hours**      |

**Percentage Reduction: 50-70% time savings**

---

### Additional Time Savings

**Monthly Reporting:**

- **Current:** 4-6 hours manual data compilation and report creation
- **With Tool:** 30 minutes (export analytics dashboard)
- **Savings:** 3.5-5.5 hours per month = **42-66 hours per year**

**Vendor Performance Reviews:**

- **Current:** 2-3 hours gathering metrics per vendor
- **With Tool:** 15 minutes (filter analytics by vendor)
- **Savings:** ~1.75 hours per review × 12 reviews/year = **21 hours per year**

**Total Annual Time Savings (Medium Volume Team):**

- Ticket processing: **681 hours**
- Monthly reporting: **54 hours**
- Vendor reviews: **21 hours**
- **TOTAL: 756 hours per year** (~18.9 weeks of full-time work)

---

### ROI Summary

**Investment:**

- Development: Already complete (sunk cost)
- AWS Hosting: ~$60-120/year
- Training: 15-20 hours one-time (distributed across team)
- Support: 2-4 hours/month = 24-48 hours/year

**Return:**

- Time savings: 756 hours/year (medium volume)
- Cost avoidance: Assuming $50/hr loaded cost = **$37,800/year**
- Improved vendor response times: 20% faster (qualitative benefit)
- Better compliance/audit trails: Risk reduction (qualitative benefit)

**Payback Period: < 1 week**

---

## Tool Support Team

### Core Support Structure

#### Tier 1: Self-Service

**Resources:**

- Quick reference guide (1-page PDF)
- FAQ document
- Video tutorials (future enhancement)
- Tooltips and in-app help text

**Resolution Time:** Immediate  
**Success Rate Target:** 40% of questions resolved here

---

#### Tier 2: Team Lead / Power Users

**Team Members:**

- GSF Team Lead
- 2-3 pilot users (become power users)

**Responsibilities:**

- Answer basic "how do I..." questions
- Troubleshoot common workflow issues
- Provide tips and best practices
- Escalate technical bugs to developer

**Availability:** During business hours (ad-hoc Slack/email)  
**Resolution Time:** < 2 hours  
**Success Rate Target:** 40% of escalated questions resolved here

---

#### Tier 3: Developer Support

**Owner:** Sminkare@amazon.com

**Responsibilities:**

- Fix technical bugs
- Implement enhancement requests
- Investigate data/system issues
- Deploy updates and patches
- Create/update documentation

**Availability:**

- Email/Slack: Response within 4 hours (critical), 24 hours (non-critical)
- Office hours: Weekly 30-min drop-in (Wednesdays 2-2:30pm)

**Resolution Time:**

- Critical bugs: < 4 hours
- Enhancement requests: Batched in monthly releases

**Commitment:** 2-4 hours per month ongoing support

---

#### Tier 4: IT/Infrastructure Support

**Team:** AWS/Cloud Ops

**Responsibilities:**

- AWS environment issues (outages, performance)
- Security incidents
- Infrastructure scaling
- Backup/recovery

**Availability:** Standard IT support hours  
**Resolution Time:** Per IT SLA  
**Frequency:** Rare (well-architected AWS setup is highly reliable)

---

### Support SLAs

| Issue Severity                              | Response Time | Resolution Time | Owner                 |
| ------------------------------------------- | ------------- | --------------- | --------------------- |
| **Critical** (Tool down, data loss)         | 1 hour        | 4 hours         | Developer + IT        |
| **High** (Feature broken, blocking work)    | 4 hours       | 24 hours        | Developer             |
| **Medium** (Workflow question, minor bug)   | 24 hours      | 3 days          | Team Lead → Developer |
| **Low** (Enhancement request, nice-to-have) | 3 days        | Next release    | Developer             |

---

### Communication Channels

**Primary:** Slack channel `#gsf-vendor-tool-support`

- Quick questions
- Status updates
- Announcements

**Secondary:** Email to Sminkare@amazon.com

- Detailed bug reports
- Enhancement requests
- Sensitive issues

**Tertiary:** Weekly office hours (Wednesdays 2-2:30pm)

- Walkthrough new features
- Q&A
- Training refreshers

---

### Escalation Path

```
User encounters issue
        │
        ▼
Check Quick Reference Guide
        │
        ├─ Resolved? → Done ✅
        │
        ▼ Not resolved
Post in Slack #gsf-vendor-tool-support
        │
        ├─ Team Lead/Power User answers → Done ✅
        │
        ▼ Not resolved (technical issue)
Developer investigates
        │
        ├─ Can fix? → Deploy fix → Done ✅
        │
        ▼ Infrastructure issue
Escalate to IT/Cloud Ops → Resolve → Done ✅
```

---

### Monthly Maintenance Cadence

**Week 1:**

- Review analytics: usage, errors, performance
- Gather enhancement requests from users
- Prioritize backlog

**Week 2:**

- Develop/test priority enhancements
- Fix any bugs identified

**Week 3:**

- Deploy monthly release
- Announce in Slack with release notes
- Office hours: demo new features

**Week 4:**

- Monitor for issues post-release
- Update documentation if needed
- Plan next month's work

**Time Commitment:** 2-4 hours per month (developer)

---

## Technology Justification

### Why Not SimTicket (Internal Ticketing System)?

#### Decision Factors:

**1. API Access Restrictions**

- **Challenge:** SimTicket API requires special permissions and approval process
- **Timeline Impact:** 4-6 weeks just to get API access approved
- **Risk:** No guarantee of approval; may be denied for external vendor use case
- **Verdict:** ❌ Unacceptable delay for urgent business need

**2. API Limitations**

- **Challenge:** SimTicket API may not expose all fields needed (vendor contacts, custom workflows)
- **Customization:** Limited ability to customize workflows and email templates
- **Integration Complexity:** Would require middleware layer to bridge SimTicket and vendor communication
- **Verdict:** ❌ Technical complexity doesn't justify API dependency

**3. Manual Overhead Still Required**

- **Problem:** Even with SimTicket integration, team still needs to:
  - Manually compose vendor emails (SimTicket doesn't have email templates)
  - Track communications outside SimTicket
  - Generate custom reports (SimTicket reporting is generic)
- **Verdict:** ❌ Doesn't solve core pain points (email composition, communication tracking)

**4. Dependency Risk**

- **Risk:** If SimTicket API changes or becomes unavailable, tool breaks
- **Maintenance:** Must maintain integration code and handle API versioning
- **Verdict:** ❌ Creates ongoing maintenance burden

**5. Speed to Market**

- **SimTicket Path:** 4-6 weeks for API access + 2-3 weeks integration development = 6-9 weeks
- **Standalone Path:** 1-2 weeks deployment + UAT = immediate value
- **Verdict:** ✅ Standalone delivers value 5-7 weeks faster

---

### ✅ Why Standalone AWS Approach?

**Advantages:**

1. **Speed to Market**
   - No API access approvals needed
   - Deploy in days, not months
   - Immediate business value

2. **Full Control**
   - Customize workflows exactly to GSF needs
   - Add features quickly based on user feedback
   - No dependency on other teams' priorities

3. **Purpose-Built User Experience**
   - Designed specifically for vendor escalation workflow
   - Intuitive interface for GSF users (not generic ticketing UI)
   - Email templates and communication hub built-in

4. **Real-Time Analytics**
   - Custom dashboards for GSF metrics
   - Exportable data for executive reporting
   - No waiting for IT to build reports

5. **Scalability**
   - Easy to expand to other teams (deploy new instance)
   - Low cost to scale (AWS auto-scaling)
   - No per-user licensing fees

6. **Future Integration Ready**
   - Can integrate with SimTicket later if business case emerges
   - API-ready architecture for future needs
   - Not locked into any particular system

---

### Why Figma Make (React + AWS)?

#### Technology Stack Justification:

**Figma Make Platform:**

- **Rapid Development:** Visual builder accelerated initial development
- **Modern Stack:** React + Tailwind CSS = industry-standard, maintainable code
- **Responsive Design:** Mobile and desktop support out-of-box
- **Component Library:** Pre-built UI components save development time

**React Framework:**

- **Industry Standard:** Large talent pool for future maintenance
- **Performance:** Fast, responsive user interface
- **Maintainability:** Component-based architecture is easy to extend
- **Ecosystem:** Vast library of packages for future enhancements

**AWS Amplify Hosting:**

- **Speed:** Deploy in minutes, not weeks
- **Reliability:** 99.9%+ uptime SLA
- **Security:** Enterprise-grade AWS infrastructure
- **Cost:** Free tier eligible, minimal cost at scale (~$5-10/month)
- **Scalability:** Auto-scales to handle traffic spikes
- **CI/CD:** Automatic deployments from Git (fast iteration)

**Why Not Alternatives?**

| Alternative                                  | Why Not Chosen                                                     |
| -------------------------------------------- | ------------------------------------------------------------------ |
| **SimTicket Integration**                    | API access delays, doesn't solve email/communication pain points   |
| **Custom Internal Tool**                     | 3-6 months development time, requires dedicated IT resources       |
| **Off-the-shelf Vendor Management Software** | Expensive licensing ($50-100/user/month), overkill for use case    |
| **Manual Process Improvement**               | Still 20-30 min per ticket, no analytics, no audit trail           |
| **SharePoint/Excel**                         | No workflow automation, poor user experience, no email integration |

**Verdict:** ✅ Figma Make + React + AWS Amplify provides fastest time-to-value with lowest cost and highest flexibility.

---

### Future Technology Roadmap

**Phase 1 (Current):** Standalone React app on AWS Amplify

- ✅ Full functionality
- ✅ LocalStorage data persistence
- ✅ Manual ticket creation

**Phase 2 (Next 6 months):** Backend database

- Add AWS DynamoDB for data persistence
- Enable multi-user collaboration
- Real-time updates across users

**Phase 3 (6-12 months):** Advanced integrations

- Optional SimTicket API integration (if business case emerges)
- Email integration (send/receive emails directly)
- SSO authentication (Amazon login)

**Phase 4 (12+ months):** AI/ML enhancements

- Auto-categorize tickets by severity
- Predict vendor response times
- Suggest optimal escalation paths

**Strategy:** Start simple, add complexity only when proven valuable. ✅

---

## Key Milestones & Decision Points

| Milestone                 | Date          | Decision Maker         | Go/No-Go Criteria                              |
| ------------------------- | ------------- | ---------------------- | ---------------------------------------------- |
| **Pilot Launch Approval** | Week 1, Day 1 | GSF Manager + IT       | AWS access granted, UAT complete               |
| **Pilot Success Review**  | Week 2, Day 5 | GSF Manager            | User satisfaction 4+/5, time savings validated |
| **Full Rollout Approval** | Week 3, Day 5 | GSF Manager            | Pilot feedback positive, critical bugs fixed   |
| **Expansion Approval**    | Week 4, End   | Procurement Leadership | 90%+ adoption, documented ROI                  |

---

## Risk Mitigation

| Risk                    | Likelihood | Impact | Mitigation                                                         |
| ----------------------- | ---------- | ------ | ------------------------------------------------------------------ |
| Low user adoption       | Medium     | High   | 1-hour training, pilot champion support, easy-to-use UI            |
| AWS cost overrun        | Low        | Low    | Free tier eligible, monitor costs weekly, ~$5-10/month max         |
| Data loss               | Low        | Medium | LocalStorage backup, export feature, future DB will add redundancy |
| Developer unavailable   | Medium     | Medium | Document codebase, train backup developer, simple architecture     |
| Feature gaps identified | High       | Low    | Rapid iteration cycle, monthly releases, prioritized backlog       |

---

## Success Criteria (End of Phase 2)

✅ **Adoption:** 90%+ of GSF Soft Services team using tool daily  
✅ **Efficiency:** 50%+ reduction in time per ticket (measured)  
✅ **Coverage:** 100% of new tickets processed through tool  
✅ **Satisfaction:** 4+/5 user satisfaction score  
✅ **Quality:** < 3 critical bugs in production  
✅ **ROI:** Documented 10+ hours per week time savings

---

## Next Steps (This Week)

1. **Monday:** Present plan to GSF Manager for approval
2. **Tuesday:** Secure AWS deployment access from IT
3. **Wednesday:** Deploy to production, begin UAT
4. **Thursday:** Complete UAT, identify pilot users
5. **Friday:** Schedule Week 2 training session

**Key Decision Needed:** Approve pilot launch and identify 2-3 pilot users ✅

---

**Document Control:**

- Version 1.0 - Initial release (April 15, 2026)
- Owner: Sminkare@amazon.com
- Next Review: After pilot completion (Week 2, Day 5)

---

**Questions or Feedback?**  
Contact: Sminkare@amazon.com
