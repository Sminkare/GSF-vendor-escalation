# 🎯 GSF Vendor Escalation Workflow

**Automatic ticket pulling from Amazon Maxis API** for GSF Procurement ticket management and vendor communications.

---

## ✅ What This App Does

- **Automatically pulls unactioned tickets** from t.corp.amazon.com (Maxis API)
- **Auto-refreshes every 2 minutes** to show latest tickets
- **Manages escalation workflow** for vendor communications
- **Tracks complete physical addresses** for technician routing
- **Email composer** with templates for vendor communications
- **Audit trails** for all actions and communications
- **File uploads** for pictures and proof of service
- **Event scheduling** for technician visits

---

## 🏗️ Architecture

```
Amazon Maxis API (t.corp.amazon.com)
         ↓
AWS Lambda (VPC with corporate network access)
         ↓
API Gateway (HTTPS endpoint)
         ↓
React App on AWS Amplify
  ├── Auto-refresh every 2 minutes
  ├── Manual refresh button
  └── Full escalation workflow
```

---

## 🚀 Quick Start

### **For Users:**

1. Open the app (deployed on AWS Amplify)
2. Tickets load automatically from your queue
3. Select a ticket to view details
4. Use the 5-tab workflow:
   - **Action** - Contact vendor, request update, escalate
   - **Email** - Send templated emails to vendors
   - **Information** - Upload pictures/proof of service
   - **Audit Trail** - View all ticket activity
   - **Events** - Schedule technician visits

### **For Developers:**

See deployment guides:
- **`LAMBDA_DEPLOYMENT_GUIDE.md`** - Deploy Lambda function
- **`MAXIS_API_INTEGRATION_GUIDE.md`** - Connect to Maxis API
- **`API_INTEGRATION_SUMMARY.md`** - Quick reference

---

## 📦 Project Structure

```
/
├── src/app/
│   ├── App.tsx                    # Main app with auto-refresh
│   ├── components/
│   │   ├── ticket-list.tsx        # Ticket queue with last refresh time
│   │   ├── ticket-details.tsx     # Ticket information display
│   │   ├── action-panel.tsx       # Escalation actions
│   │   ├── email-composer.tsx     # Vendor email templates
│   │   ├── communications.tsx     # Internal/vendor communications
│   │   ├── information-tab.tsx    # File uploads
│   │   ├── audit-trail.tsx        # Activity tracking
│   │   ├── event-management.tsx   # Scheduling
│   │   └── create-ticket-dialog.tsx  # Manual ticket creation (backup)
│   └── services/
│       └── ticket-api.ts          # API integration layer
├── lambda/
│   └── fetchMaxisTickets/
│       ├── index.js               # Lambda function
│       ├── package.json           # Dependencies
│       └── template.yaml          # SAM deployment config
└── docs/
    ├── LAMBDA_DEPLOYMENT_GUIDE.md
    ├── MAXIS_API_INTEGRATION_GUIDE.md
    └── API_INTEGRATION_SUMMARY.md
```

---

## 🔧 Configuration

### **Environment Variables**

Create `.env` file:

```bash
# Enable API mode (set to false for mock data)
VITE_USE_API=true

# API Gateway endpoint (from Lambda deployment)
VITE_MAXIS_API_ENDPOINT=https://your-api-id.execute-api.us-west-2.amazonaws.com/prod/tickets
```

### **Lambda Configuration**

Required environment variables for Lambda:

```bash
MAXIS_ENDPOINT=https://maxis-service-integ-pdx.amazon.com
MATERIAL_SET=your.material.set
AWS_REGION=us-west-2
```

---

## 🎯 Features

### **Ticket Management**
- ✅ Auto-pull unactioned tickets from Maxis
- ✅ Filter by status, assigned group, assignee
- ✅ SEV 1-5 severity levels
- ✅ Status tracking (Pending, In Progress, Completed)
- ✅ Complete physical address for each ticket

### **Escalation Workflow**
- ✅ 4-step workflow visualization
- ✅ Action panel with predefined actions
- ✅ Email templates (initial, follow-up, escalation)
- ✅ Automatic status updates

### **Communications**
- ✅ Internal team communications
- ✅ Vendor email thread
- ✅ Unread email notifications
- ✅ Simulated vendor responses

### **Information Management**
- ✅ File upload (pictures, PDFs, documents)
- ✅ Categorization (Before, After, Proof of Service)
- ✅ File preview and download
- ✅ File management

### **Audit Trail**
- ✅ Complete activity log
- ✅ User tracking
- ✅ Timestamp for all actions
- ✅ Action type categorization

### **Event Scheduling**
- ✅ Schedule technician visits
- ✅ Status tracking (Scheduled, In Progress, Completed)
- ✅ Location and time management
- ✅ Event notes and updates

---

## 🚀 Deployment

### **Frontend (Amplify)**

Already configured! Just push to GitHub:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Amplify auto-deploys in ~3-5 minutes.

### **Backend (Lambda)**

See detailed guide: `LAMBDA_DEPLOYMENT_GUIDE.md`

Quick steps:

```bash
# 1. Navigate to Lambda directory
cd lambda/fetchMaxisTickets

# 2. Build
sam build

# 3. Deploy
sam deploy --guided

# 4. Copy API URL from output
# 5. Add to Amplify environment variables
```

---

## 🧪 Testing

### **Test with Mock Data**

Set in `.env`:
```bash
VITE_USE_API=false
```

### **Test with Live API**

1. Deploy Lambda function
2. Set environment variables
3. Enable API mode
4. Check browser console for logs

---

## 📊 Ticket Query Configuration

Lambda fetches tickets matching:

```javascript
{
  status: ["Assigned", "Researching", "Work In Progress", "Pending"],
  assignedGroup: ["GSF Procurement-Soft Services", "SSD-RSR-SPEED"],
  assignee: [
    "email-alias:gsf-softservice",
    "kerberos:nobody@ANT.AMAZON.COM",
    "email-alias:ssd-rsr-speed-intake"
  ],
  createdDate: { gte: "last 30 days" }
}
```

To modify query parameters, edit `/lambda/fetchMaxisTickets/index.js`

---

## 🔐 Security

- ✅ Material set stored in AWS Secrets Manager
- ✅ Lambda runs in VPC with corporate network access
- ✅ CORS configured for Amplify domain only
- ✅ Environment variables not committed to Git
- ✅ Secure authentication with Odin credentials

---

## 📈 Monitoring

### **CloudWatch Logs**

View Lambda logs:

```bash
aws logs tail /aws/lambda/gsf-fetch-maxis-tickets --follow
```

### **Metrics**

- Invocation count
- Error rate
- Duration
- Ticket count per request

---

## 🆘 Troubleshooting

### **Tickets not loading?**

1. Check browser console for errors
2. Verify `VITE_USE_API=true`
3. Verify API endpoint is correct
4. Check Lambda logs for errors

### **Lambda can't reach Maxis?**

1. Verify VPC configuration
2. Check security group allows outbound HTTPS
3. Verify material set is correct
4. Contact Maxis API team

### **CORS errors?**

1. Update Lambda template with your Amplify domain
2. Redeploy Lambda
3. Clear browser cache

---

## 📚 Documentation

- **`LAMBDA_DEPLOYMENT_GUIDE.md`** - Complete Lambda setup
- **`MAXIS_API_INTEGRATION_GUIDE.md`** - Maxis API integration
- **`API_INTEGRATION_SUMMARY.md`** - Quick reference
- **`DEPLOYMENT_READY.md`** - Deployment checklist
- **`QUICK_START_API.md`** - Fast setup guide

---

## 🤝 Support

### **Maxis API:**
- Contact: Maxis API Support Team
- Docs: Internal Wiki

### **AWS/Lambda:**
- Contact: Your AWS Administrator

### **Material Set:**
- Contact: Amazon IT Support

---

## 📝 License

Internal Amazon tool - Not for external distribution

---

## ✨ Features Coming Soon

- [ ] Real-time notifications (WebSocket)
- [ ] Advanced filtering and search
- [ ] Ticket templates
- [ ] Bulk actions
- [ ] Export to Excel
- [ ] Mobile responsive design improvements

---

**Built with:** React, TypeScript, Tailwind CSS, AWS Lambda, AWS Amplify

**Last Updated:** March 17, 2026
