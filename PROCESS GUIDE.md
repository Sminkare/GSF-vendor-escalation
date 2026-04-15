# GSF Vendor Escalation Workflow Tool - Process Guide

**Version:** 1.0  
**Last Updated:** April 15, 2026  
**Owner:** Sminkare@amazon.com

---

## Table of Contents
1. [Overview](#overview)
2. [How to Use the Tool](#how-to-use-the-tool)
3. [Implementation Process](#implementation-process)
4. [Teams Involved & Approval Chain](#teams-involved--approval-chain)
5. [User Roles & Responsibilities](#user-roles--responsibilities)
6. [Training Requirements](#training-requirements)

---

## Overview

The GSF Vendor Escalation Workflow Tool is a standalone, AWS-hosted web application designed to streamline the vendor escalation process for GSF Procurement teams. It eliminates manual ticket tracking, automates email communications, and provides real-time analytics.

**Key Benefits:**
- 50-70% reduction in time per escalation
- Centralized communication hub
- Real-time analytics and reporting
- Complete audit trail for compliance

---

## How to Use the Tool

### Step 1: Access the Application
1. Navigate to: https://main.d2blqlv3mgvbtw.amplifyapp.com/
2. Bookmark the URL for quick access
3. No login required (current version) - future versions will include SSO

### Step 2: Select or Create a Ticket
**Option A: Select Existing Ticket**
- View the ticket queue on the left panel
- Tickets are auto-populated and color-coded by status:
  - 🟡 **Pending** - New, needs review
  - 🔵 **In Progress** - Actively being worked
  - 🟠 **Awaiting Vendor** - Waiting for vendor response
  - 🟢 **Completed** - Resolved
- Click any ticket to view details

**Option B: Create New Ticket**
- Click "+ New Ticket" button
- Fill in required fields:
  - Ticket number (e.g., AMZN-12345)
  - Title/description
  - Vendor name
  - Location/site
  - Severity level (High, Medium, Low)
  - Issue category
- Click "Create Ticket"

### Step 3: Review Ticket Details
Once a ticket is selected, you'll see:
- **Ticket Summary**: Number, status, vendor, location, severity
- **Description**: Full issue details
- **Timeline**: Created date, due date, aging
- **Assignee**: Team member responsible
- **Edit Options**: Update status, severity, or assignee inline

### Step 4: Communicate with Stakeholders
**Internal Communications:**
- Click the "Communications" section
- Add internal notes for team visibility
- Tag specific team members if needed
- All notes are timestamped and attributed

**Vendor Email Simulation:**
- Click "Simulate Vendor Email" to test receiving vendor responses
- Unread vendor emails show notification badges
- Click "Mark as Read" after reviewing

### Step 5: Take Action
Navigate to the **Action** tab and choose:

**Contact Vendor:**
- Initiates first vendor outreach
- Changes ticket status to "Awaiting Vendor"
- Auto-switches to Email tab with template

**Request Update:**
- For follow-up when vendor hasn't responded
- Sends follow-up email template
- Logs action in audit trail

**Escalate:**
- Choose escalation level:
  - Account Manager
  - Regional Manager
  - Executive
- Auto-generates escalation email
- Updates ticket priority

**Mark Completed:**
- Closes the ticket
- Records resolution timestamp
- Archives for reporting

### Step 6: Send Email
The **Email** tab provides:
- **Pre-filled templates** based on action taken
- **Auto-populated fields**:
  - To: Vendor email
  - CC: Your team/manager
  - Subject: Ticket number + issue summary
  - Body: Professional template with ticket details
- **Customization**: Edit any field before sending
- **Send**: Click "Send Email" button
- **Confirmation**: Toast notification confirms delivery

### Step 7: Track Supporting Information
**Information Tab:**
- Upload files (quotes, invoices, photos)
- Categorize documents (Quote, Invoice, Photo, Report, Contract, Other)
- Download or delete files as needed
- All uploads are logged in audit trail

**Events Tab:**
- Schedule service appointments
- Set reminders for follow-ups
- Track vendor visit dates/times
- Update event status (Scheduled → Completed → Cancelled)

**Audit Trail Tab:**
- View complete history of all actions
- Filter by action type:
  - Status changes
  - Communications
  - File uploads
  - Email sends
- Export for compliance/reporting

### Step 8: Monitor Analytics
Click **Analytics** in the left sidebar to view:
- **Ticket Metrics**: Total count, status breakdown, completion rate
- **Response Time**: Average vendor response time
- **Volume Trends**: Daily/weekly ticket creation patterns
- **Top Vendors**: Most frequent escalations
- **Aging Report**: Tickets by age (0-7 days, 8-14 days, 15-30 days, 30+ days)
- **Charts**: Visual representations of all metrics
- **Export**: Download data for executive reporting

---

## Implementation Process

### Phase 1: Pilot (Weeks 1-2)
**Week 1: Deployment & UAT**
1. **Deploy to AWS Amplify** (1-2 days)
   - Finalize production configuration
   - Test all features in production environment
   - Verify email functionality
   - Confirm analytics data flow

2. **User Acceptance Testing** (3-5 days)
   - GSF SME validates workflows
   - Test with sample tickets
   - Verify email templates
   - Check reporting accuracy
   - Document any bugs/feedback

**Week 2: Pilot Launch**
1. **Training Session** (1 hour)
   - Live walkthrough of tool
   - Q&A session
   - Distribute quick reference guide

2. **Pilot Users Begin Using Tool**
   - 2-3 selected GSF Soft Services team members
   - Process 10-20 real tickets
   - Daily check-ins for first 3 days
   - Weekly feedback collection

### Phase 2: Rollout (Weeks 3-4)
**Week 3: Refinements**
- Address pilot feedback
- Fix any bugs identified
- Optimize workflows based on user input
- Update templates if needed

**Week 4: Full GSF Soft Services Rollout**
- Train remaining team members
- All tickets flow through tool
- Monitor adoption metrics
- Continue feedback loop

### Phase 3: Expansion (Week 5+)
**Other Non Grocery Teams**
- Replicate process for additional teams
- Customize templates per team needs
- Share best practices from GSF pilot
- Scale infrastructure as needed

---

## Teams Involved & Approval Chain

### Primary Stakeholders

#### 1. **GSF Procurement Team** (End Users)
**Involvement:**
- Primary users of the tool
- Provide workflow requirements
- Participate in UAT and pilot
- Provide ongoing feedback

**Approval Needed:**
- ✅ Workflow validation
- ✅ Email template approval
- ✅ Sign-off on UAT completion

**Key Contacts:**
- [GSF Manager Name/Email]
- [GSF Team Lead Name/Email]

---

#### 2. **IT/Cloud Infrastructure Team** (Technical Support)
**Involvement:**
- AWS account setup and permissions
- Review security/compliance requirements
- Provide production deployment support
- Ongoing infrastructure monitoring

**Approval Needed:**
- ✅ AWS resource provisioning
- ✅ Security review (if required)
- ✅ Production deployment approval

**Key Contacts:**
- [IT Manager Name/Email]
- [Cloud Ops Contact]

---

#### 3. **Information Security** (Optional - based on data sensitivity)
**Involvement:**
- Review data handling practices
- Validate compliance with Amazon security policies
- Approve external hosting (if required)

**Approval Needed:**
- ✅ Security assessment (if handling PII)
- ✅ Data retention policy approval

**Key Contacts:**
- [InfoSec Contact]

---

#### 4. **Finance/Procurement Leadership** (Budget & Strategy)
**Involvement:**
- Approve AWS hosting costs (~$5-10/month)
- Strategic alignment with procurement goals
- ROI review

**Approval Needed:**
- ✅ Budget approval for AWS costs
- ✅ Strategic initiative sign-off
- ✅ Pilot launch authorization

**Key Contacts:**
- [Procurement Director Name/Email]
- [Finance Manager Name/Email]

---

#### 5. **Development Team** (Creator/Maintainer)
**Involvement:**
- Build and deploy application
- Provide training and documentation
- Support pilot users
- Implement feedback/enhancements

**Responsibilities:**
- Tool maintenance
- Bug fixes
- Feature enhancements
- User support during pilot

**Key Contact:**
- Sminkare@amazon.com

---

### Approval Workflow

```
┌─────────────────────────────────────────────┐
│  Step 1: GSF Leadership Approval            │
│  ✅ Approve pilot launch                     │
│  ✅ Identify pilot users                     │
│  ✅ Allocate team time for training         │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│  Step 2: IT/Cloud Infrastructure Approval   │
│  ✅ AWS account setup                        │
│  ✅ Deployment permissions                   │
│  ✅ Production environment access           │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│  Step 3: Finance Approval (if needed)       │
│  ✅ AWS cost approval (~$5-10/month)         │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│  Step 4: Security Review (if required)      │
│  ✅ Data handling assessment                 │
│  ✅ Compliance check                         │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│  Step 5: Deployment & Go-Live               │
│  ✅ Deploy to production                     │
│  ✅ Train pilot users                        │
│  ✅ Launch pilot                             │
└─────────────────────────────────────────────┘
```

**Estimated Timeline for Approvals:** 3-5 business days

---

## User Roles & Responsibilities

### GSF Procurement Specialist
**Responsibilities:**
- Review and action tickets daily
- Communicate with vendors via tool
- Upload supporting documents
- Update ticket status
- Collaborate with team via internal notes

**Daily Tasks:**
- Check ticket queue (5-10 min)
- Action 3-8 tickets (30-90 min total)
- Review vendor responses (10-15 min)
- Update leadership on escalations (as needed)

---

### GSF Team Lead
**Responsibilities:**
- Monitor team performance via analytics
- Review high-severity escalations
- Approve escalations to executive level
- Provide coaching based on metrics
- Generate weekly reports for leadership

**Weekly Tasks:**
- Review analytics dashboard (15 min)
- Team huddle to discuss trends (30 min)
- Export data for leadership report (10 min)

---

### GSF Manager
**Responsibilities:**
- Strategic oversight
- Review monthly analytics
- Identify process improvements
- Vendor performance discussions
- Budget tracking

**Monthly Tasks:**
- Review monthly metrics (30 min)
- Vendor performance review meetings (1-2 hours)
- Process improvement initiatives (as needed)

---

## Training Requirements

### Initial Training (1 hour)
**Format:** Live demo + hands-on practice  
**Attendees:** All pilot users + team lead

**Agenda:**
1. **Overview** (10 min)
   - Why this tool was built
   - Key benefits
   - Tour of interface

2. **Ticket Management** (15 min)
   - Selecting tickets
   - Creating new tickets
   - Updating ticket details

3. **Communication** (15 min)
   - Internal notes
   - Email templates
   - Vendor response tracking

4. **Action Workflow** (10 min)
   - Contact vendor
   - Escalate
   - Mark completed

5. **Supporting Features** (5 min)
   - File uploads
   - Event scheduling
   - Audit trail

6. **Analytics** (5 min)
   - Dashboard overview
   - Key metrics to monitor

7. **Q&A + Hands-On** (remaining time)
   - Practice with test tickets
   - Answer questions

### Quick Reference Guide
**Format:** 1-page PDF cheat sheet  
**Contents:**
- Common workflows
- Keyboard shortcuts
- Email template tips
- Who to contact for help

### Ongoing Support
- **Week 1**: Daily Slack check-ins
- **Week 2-4**: Weekly office hours (30 min)
- **Ongoing**: Email support (Sminkare@amazon.com)

---

## Success Metrics

Track these KPIs to measure tool effectiveness:

### Efficiency Metrics
- ✅ **Time per ticket**: Target 10-15 min (vs. 25-45 min baseline)
- ✅ **Tickets processed per week**: Increase by 30-50%
- ✅ **Weekly time savings**: 4-26 hours

### Quality Metrics
- ✅ **Vendor response time**: Improve by 20%
- ✅ **Escalation rate**: Track trends
- ✅ **Ticket aging**: Reduce 30+ day tickets

### Adoption Metrics
- ✅ **Active users**: 80%+ of team using daily
- ✅ **Tickets in tool**: 100% by Week 4
- ✅ **User satisfaction**: Survey score 4+/5

---

## Troubleshooting & Support

### Common Issues

**Issue:** Can't access the tool  
**Solution:** Verify URL, check internet connection, clear browser cache

**Issue:** Email not sending  
**Solution:** Check email template fields, verify vendor email address

**Issue:** Ticket not saving  
**Solution:** Ensure all required fields filled, check browser console for errors

**Issue:** Analytics not loading  
**Solution:** Refresh page, verify tickets exist in system

### Contact for Support
- **Developer Support:** Sminkare@amazon.com
- **Response Time:** Within 24 hours (4 hours for critical issues)
- **Escalation:** [Manager contact if developer unavailable]

---

## Appendix

### Email Templates Reference
1. **Initial Contact**: Used when first contacting vendor
2. **Follow-Up**: Used for vendor response requests
3. **Escalation**: Used when escalating to management
4. **Resolution Confirmation**: Used to confirm ticket closure

### Glossary
- **Ticket**: A service request requiring vendor action
- **Escalation**: Raising issue to higher authority
- **Audit Trail**: Complete log of all actions on a ticket
- **UAT**: User Acceptance Testing
- **GSF**: Global Supply Facilities (or Grocery Store Facilities)

---

**Document Control:**
- Version 1.0 - Initial release (April 15, 2026)
- Owner: Sminkare@amazon.com
- Next Review: After pilot completion (Week 4)
