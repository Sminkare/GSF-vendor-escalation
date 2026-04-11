# 🔌 Maxis API Integration Guide

This guide explains how to connect your GSF Vendor Escalation Workflow to the Amazon Maxis ticketing API.

---

## 📋 **Overview**

Your app is now set up to fetch tickets from the Maxis API via an AWS Lambda backend. This guide will help you complete the integration.

---

## 🏗️ **Architecture**

```
Amazon Maxis API (t.corp.amazon.com)
         ↓
    AWS Lambda Function (with Odin credentials)
         ↓
    API Gateway (REST endpoint)
         ↓
    Your Amplify Frontend App
```

---

## ⚙️ **What's Already Set Up**

✅ **Frontend Service** (`/src/app/services/ticket-api.ts`)
   - Fetches tickets from Lambda API
   - Transforms Maxis data to app format
   - Handles errors gracefully
   - Falls back to mock data if API unavailable

✅ **App Component** (`/src/app/App.tsx`)
   - Loads tickets on startup
   - "Refresh Tickets" button to reload from API
   - Error handling with user notifications

✅ **API Configuration** (`/amplify/backend/api-config.json`)
   - Maxis endpoint configuration
   - Query parameters for your ticket queue

---

## 🚀 **Next Steps: Complete the Integration**

### **Step 1: Create Lambda Function**

You'll need to create an AWS Lambda function that:
1. **Authenticates** with Maxis using Odin credentials
2. **Fetches tickets** from the Maxis API
3. **Returns data** to your frontend

#### **Sample Lambda Function (Node.js)**

Create a file: `/lambda/fetchTickets.js`

```javascript
const AWS = require('aws-sdk');

// This is a template - you'll need to adapt it for the actual Maxis client library
exports.handler = async (event) => {
    try {
        // TODO: Replace with actual Maxis client initialization
        // const MaxisClient = require('maxis-client'); // Replace with actual package
        
        // Initialize Maxis client with Odin credentials
        // const client = new MaxisClient({
        //     endpoint: process.env.MAXIS_ENDPOINT,
        //     materialSet: process.env.MATERIAL_SET,
        //     credentials: new OdinAWSCredentialsProvider()
        // });
        
        // Fetch tickets from Maxis
        // const response = await client.getIssues({
        //     query: JSON.parse(process.env.TICKET_QUERY)
        // });
        
        // For now, return mock data
        const mockResponse = {
            tickets: [
                {
                    id: "1",
                    issueNumber: "V2094350354",
                    summary: "[MAV2] [Trash, Recycling, Compost (Waste) Request]",
                    description: "Two open tops need to be emptied and returned",
                    status: "Pending",
                    severity: "4",
                    assignedGroup: "GSF Procurement-Soft Services",
                    assignee: "gsf-softservice",
                    requester: "zelfonse",
                    createdDate: new Date().toISOString(),
                    location: {
                        site: "MAV2",
                        building: "Building 3, Loading Dock B",
                        address: {
                            street: "5335 Wisconsin Avenue NW",
                            city: "Chevy Chase",
                            state: "MD",
                            zipCode: "20815"
                        }
                    },
                    category: "GSF Procurement Operations",
                    serviceType: "Trash, Recycling, Compost (Waste)",
                    vendor: "Waste Management Services",
                    pendingReason: "Arrival of Technician",
                    rootCause: "MAV2-AFS"
                }
            ]
        };
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Update with your domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: JSON.stringify(mockResponse)
        };
        
    } catch (error) {
        console.error('Error fetching tickets:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Failed to fetch tickets',
                message: error.message
            })
        };
    }
};
```

---

### **Step 2: Configure Lambda Environment Variables**

In AWS Lambda console, set these environment variables:

```
MAXIS_ENDPOINT=https://maxis-service-integ-pdx.amazon.com
MATERIAL_SET=your.material.set
TICKET_QUERY={"status":{"OR":["Assigned","Researching","Work In Progress","Pending"]},...}
```

---

### **Step 3: Set Up IAM Permissions**

Your Lambda function needs:

1. **Odin Credentials Access**
   - Permission to use your material set
   - Access to Amazon internal authentication

2. **Network Access**
   - VPC configuration to reach internal Amazon services
   - Security group allowing outbound HTTPS

3. **Execution Role**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "logs:CreateLogGroup",
           "logs:CreateLogStream",
           "logs:PutLogEvents"
         ],
         "Resource": "arn:aws:logs:*:*:*"
       }
     ]
   }
   ```

---

### **Step 4: Create API Gateway**

1. **Go to AWS API Gateway Console**
2. **Create REST API**
   - Name: `gsf-maxis-api`
   - Endpoint: Regional

3. **Create Resource**
   - Path: `/tickets`

4. **Create GET Method**
   - Integration: Lambda Function
   - Function: Your `fetchTickets` Lambda

5. **Enable CORS**
   - Allow origins: Your Amplify domain
   - Allow methods: GET, OPTIONS

6. **Deploy API**
   - Stage name: `prod`
   - Copy your API URL (e.g., `https://abc123.execute-api.us-west-2.amazonaws.com/prod/tickets`)

---

### **Step 5: Configure Frontend Environment Variable**

Create `.env` file in your project root:

```env
VITE_MAXIS_API_ENDPOINT=https://abc123.execute-api.us-west-2.amazonaws.com/prod/tickets
```

Update `amplify.yml` to include environment variable:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
  environment:
    variables:
      VITE_MAXIS_API_ENDPOINT: https://abc123.execute-api.us-west-2.amazonaws.com/prod/tickets
```

---

## 🔧 **Testing the Integration**

### **Test Lambda Locally**

1. Install AWS SAM CLI
2. Create `template.yaml`:
   ```yaml
   AWSTemplateFormatVersion: '2010-09-09'
   Transform: AWS::Serverless-2016-10-31
   Resources:
     FetchTicketsFunction:
       Type: AWS::Serverless::Function
       Properties:
         Handler: fetchTickets.handler
         Runtime: nodejs18.x
         Environment:
           Variables:
             MAXIS_ENDPOINT: https://maxis-service-integ-pdx.amazon.com
             MATERIAL_SET: your.material.set
   ```

3. Run locally:
   ```bash
   sam local invoke FetchTicketsFunction
   ```

### **Test API Endpoint**

```bash
curl https://abc123.execute-api.us-west-2.amazonaws.com/prod/tickets
```

### **Test in Frontend**

Click the **"Refresh Tickets"** button in your app to fetch live data!

---

## 🔐 **Authentication Challenges**

### **⚠️ Important:**

The Maxis API requires **Odin credentials** which are internal to Amazon. Your Lambda function must:

1. **Run in Amazon's network** (VPC configuration)
2. **Have access to your material set**
3. **Use Odin authentication**

### **Options:**

#### **Option A: Contact Amazon IT**
- Request Lambda VPC access to Maxis
- Get material set credentials
- Set up Odin authentication in Lambda

#### **Option B: Proxy Service**
- Deploy a service on Amazon corporate network
- Service calls Maxis API with your credentials
- Lambda calls your internal service

#### **Option C: Hybrid Approach**
- Keep manual ticket creation (current working feature)
- Use API for read-only operations
- Escalation workflow works independently

---

## 📊 **Current Status**

✅ **Working Now:**
- Manual ticket creation via "New Ticket" button
- Full escalation workflow
- Email composer with address handling
- Audit trails, events, communications
- File uploads and management

🚧 **Needs Configuration:**
- Lambda function deployment
- Odin credentials setup
- API Gateway connection
- Environment variables

---

## 🆘 **Need Help?**

### **Contact:**
- **Amazon IT Support** for Odin credentials and material set access
- **Your AWS Administrator** for Lambda and VPC configuration
- **Maxis API Team** for API documentation and support

### **Resources:**
- Internal Wiki: Amazon Maxis API Documentation
- Material Set: Your assigned material set
- Support: Amazon internal ticketing support

---

## 🎯 **Recommended Approach**

**Phase 1: Use Manual Creation (Currently Working)**
- Create tickets manually from Amazon system
- Full workflow functionality available now
- No API dependencies

**Phase 2: Add API Integration (Future Enhancement)**
- Work with IT to set up Lambda
- Configure Odin credentials
- Enable automatic ticket sync

This way, you can **start using the app immediately** while working on the API integration in the background!

---

**Questions?** Feel free to ask for clarification on any step!
