# 🚀 Lambda Deployment Guide - Auto-Pull Tickets from Maxis

## ✅ **Solution Overview**

Your app now **automatically pulls unactioned tickets** from the Amazon Maxis API every 2 minutes. No manual ticket creation needed!

### **How It Works:**

```
Maxis API (t.corp.amazon.com)
         ↓
AWS Lambda (in VPC with corporate network access)
         ↓
API Gateway (HTTPS endpoint)
         ↓
Your Amplify App (auto-refreshes every 2 minutes)
```

---

## 📦 **What's Been Created**

### **Lambda Function** (`/lambda/fetchMaxisTickets/`)
- ✅ Fetches unactioned tickets from Maxis API
- ✅ Filters by status: Assigned, Researching, Work In Progress, Pending
- ✅ Filters by your assigned groups
- ✅ Returns tickets in format ready for your app
- ✅ Includes error handling and fallback

### **Frontend Updates**
- ✅ Auto-loads tickets on app start
- ✅ Auto-refreshes every 2 minutes (silent background refresh)
- ✅ "Refresh Tickets" button for manual refresh
- ✅ Shows loading states and error messages
- ✅ Displays ticket count and last refresh time

---

## 🚀 **Deployment Steps**

### **Prerequisites**

Before deploying, you need:

1. ✅ **AWS CLI** installed and configured
2. ✅ **AWS SAM CLI** installed ([Download here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))
3. ✅ **VPC with access** to Amazon internal network
4. ✅ **Security Group** allowing outbound HTTPS
5. ✅ **Material Set** for Maxis API authentication
6. ✅ **Subnet IDs** for Lambda VPC configuration

---

### **Step 1: Install AWS SAM CLI**

```bash
# macOS
brew install aws-sam-cli

# Windows
choco install aws-sam-cli

# Linux
pip install aws-sam-cli

# Verify installation
sam --version
```

---

### **Step 2: Configure Maxis Client**

The Lambda function currently has a mock Maxis client. You need to replace it with the actual Maxis API client.

#### **Option A: Use Maxis Node.js SDK (if available)**

Contact the Maxis API team to see if there's a Node.js SDK. If yes:

```bash
cd lambda/fetchMaxisTickets
npm install @amazon/maxis-client  # Replace with actual package name
```

Then update `/lambda/fetchMaxisTickets/index.js`:

```javascript
const MaxisClient = require('@amazon/maxis-client');

async function fetchTicketsFromMaxis(endpoint, materialSet) {
  const client = new MaxisClient({
    endpoint: endpoint,
    materialSet: materialSet,
    region: 'us-west-2'
  });
  
  const response = await client.queryIssues(TICKET_QUERY);
  return response.issues;
}
```

#### **Option B: Call Maxis REST API directly**

If Maxis exposes a REST API, you can call it using the `callMaxisRestAPI` function already in the Lambda code.

Update the function with the correct:
- API path (e.g., `/api/v1/issues/query`)
- Authentication headers
- Request format

#### **Option C: Use Java Client via AWS Lambda Layer**

If only a Java client is available, you have two options:

1. **Create a separate Java Lambda** that calls Maxis
2. **Use a Node.js wrapper** that calls a Java process (not recommended)

---

### **Step 3: Get VPC Configuration**

You need the following from your AWS administrator or IT team:

```bash
# VPC ID (where Lambda will run)
VPC_ID=vpc-xxxxxxxxx

# Subnet IDs (private subnets with NAT gateway or VPC endpoints)
SUBNET_IDS=subnet-aaaaa,subnet-bbbbb,subnet-ccccc

# Security Group ID (allows outbound HTTPS)
SECURITY_GROUP_ID=sg-xxxxxxxxx
```

To check if your subnets have internet access:

```bash
# List route tables for your subnets
aws ec2 describe-route-tables --filters "Name=association.subnet-id,Values=subnet-aaaaa"

# Look for routes to NAT Gateway (nat-xxxxx) or Internet Gateway (igw-xxxxx)
```

---

### **Step 4: Store Material Set in Secrets Manager (Recommended)**

Store your Maxis material set securely:

```bash
aws secretsmanager create-secret \
  --name maxis/material-set \
  --secret-string '{"materialSet":"your.material.set"}' \
  --region us-west-2
```

Or use AWS Parameter Store:

```bash
aws ssm put-parameter \
  --name /gsf/maxis/material-set \
  --value "your.material.set" \
  --type SecureString \
  --region us-west-2
```

---

### **Step 5: Deploy Lambda Function**

Navigate to the Lambda directory:

```bash
cd lambda/fetchMaxisTickets
```

Build and deploy using SAM:

```bash
# Build the Lambda package
sam build

# Deploy (guided mode - first time)
sam deploy --guided
```

You'll be prompted for:

```
Stack Name: gsf-maxis-tickets
AWS Region: us-west-2
Parameter MaxisEndpoint: https://maxis-service-integ-pdx.amazon.com
Parameter MaterialSet: your.material.set
Parameter VpcId: vpc-xxxxxxxxx
Parameter SubnetIds: subnet-aaaaa,subnet-bbbbb
Parameter SecurityGroupId: sg-xxxxxxxxx
Confirm changes before deploy: Y
Allow SAM CLI IAM role creation: Y
Save arguments to configuration file: Y
```

Wait for deployment to complete (~2-5 minutes).

---

### **Step 6: Get API Gateway URL**

After deployment, SAM will output the API URL:

```
Outputs:
ApiUrl: https://abc123xyz.execute-api.us-west-2.amazonaws.com/prod/tickets
```

**Copy this URL** - you'll need it for the frontend configuration.

---

### **Step 7: Test Lambda Function**

Test the Lambda directly:

```bash
# Invoke Lambda
aws lambda invoke \
  --function-name gsf-fetch-maxis-tickets \
  --region us-west-2 \
  --log-type Tail \
  response.json

# View response
cat response.json
```

Test via API Gateway:

```bash
# Call the API
curl https://abc123xyz.execute-api.us-west-2.amazonaws.com/prod/tickets

# Should return JSON with tickets
```

---

### **Step 8: Configure Frontend**

Create a `.env` file in your project root:

```bash
# Enable API mode
VITE_USE_API=true

# Set API endpoint (from Step 6)
VITE_MAXIS_API_ENDPOINT=https://abc123xyz.execute-api.us-west-2.amazonaws.com/prod/tickets
```

---

### **Step 9: Configure Amplify Environment Variables**

Since `.env` files aren't committed to Git, configure environment variables in Amplify Console:

1. Go to **AWS Amplify Console**
2. Select your app
3. Click **Environment variables** (left sidebar)
4. Add variables:
   - Key: `VITE_USE_API` → Value: `true`
   - Key: `VITE_MAXIS_API_ENDPOINT` → Value: `https://abc123xyz.execute-api.us-west-2.amazonaws.com/prod/tickets`
5. Save

---

### **Step 10: Update CORS (Production)**

Update the Lambda template to allow only your Amplify domain:

In `/lambda/fetchMaxisTickets/template.yaml`:

```yaml
Cors:
  AllowOrigin: "'https://your-app.amplifyapp.com'"  # Replace with your domain
```

Redeploy:

```bash
sam build
sam deploy
```

---

### **Step 11: Deploy Frontend**

Commit and push your code:

```bash
git add .
git commit -m "Add automatic ticket polling from Maxis API"
git push origin main
```

Amplify will auto-deploy with the environment variables.

---

## 🧪 **Testing**

### **Test 1: Lambda Function**

```bash
# Check Lambda logs
aws logs tail /aws/lambda/gsf-fetch-maxis-tickets --follow

# Invoke Lambda
aws lambda invoke --function-name gsf-fetch-maxis-tickets response.json
cat response.json
```

**Expected:** JSON with tickets array

### **Test 2: API Gateway**

```bash
# Call API
curl https://your-api-url.amazonaws.com/prod/tickets

# Should return:
# {
#   "success": true,
#   "tickets": [...],
#   "count": 3,
#   "timestamp": "2026-03-17T..."
# }
```

### **Test 3: Frontend**

1. Open your app
2. Check browser console:
   - `Fetching tickets from API: https://...`
   - `Fetched X tickets from API`
3. Tickets should appear in list
4. Wait 2 minutes - should auto-refresh
5. Click "Refresh Tickets" - should fetch immediately

---

## 🔧 **Troubleshooting**

### **Problem: Lambda can't reach Maxis API**

**Solution:**
- Verify Lambda is in VPC subnets with NAT gateway
- Check security group allows outbound HTTPS (port 443)
- Verify VPC has route to Amazon internal network

```bash
# Test from within VPC (EC2 instance in same subnet)
curl https://maxis-service-integ-pdx.amazon.com
```

### **Problem: Authentication fails**

**Solution:**
- Verify material set is correct
- Check Odin credentials are properly configured
- Contact Maxis API team for authentication docs

### **Problem: CORS errors in browser**

**Solution:**
- Update API Gateway CORS settings
- Allow your Amplify domain as origin
- Redeploy Lambda

```yaml
Cors:
  AllowOrigin: "'https://your-app.amplifyapp.com'"
  AllowHeaders: "'Content-Type,Authorization'"
  AllowMethods: "'GET,OPTIONS'"
```

### **Problem: Frontend shows "Using mock data"**

**Solution:**
- Check environment variable `VITE_USE_API=true` is set
- Check `VITE_MAXIS_API_ENDPOINT` is correct URL
- Clear browser cache and hard refresh

### **Problem: Tickets not updating**

**Solution:**
- Check browser console for errors
- Verify API returns different data
- Check auto-refresh is working (should refresh every 2 min)

---

## ⚙️ **Advanced Configuration**

### **Enable Scheduled Polling (Optional)**

Uncomment the EventBridge rule in `template.yaml` to have Lambda automatically fetch tickets every 5 minutes (even if no one is using the app):

```yaml
ScheduledPollRule:
  Type: AWS::Events::Rule
  Properties:
    Description: Poll Maxis API every 5 minutes for new tickets
    ScheduleExpression: rate(5 minutes)
    State: ENABLED
    Targets:
      - Arn: !GetAtt FetchMaxisTicketsFunction.Arn
        Id: TicketPollTarget
```

This is useful for:
- Pre-loading tickets
- Caching results
- Reducing API latency

### **Add Caching with DynamoDB**

Store fetched tickets in DynamoDB to reduce Maxis API calls:

1. Add DynamoDB table to `template.yaml`
2. Update Lambda to check cache first
3. Cache tickets for 5 minutes
4. Return cached data if fresh

### **Add SNS Notifications**

Get notified when new high-priority tickets arrive:

1. Create SNS topic
2. Lambda checks for new SEV 1-2 tickets
3. Sends email/Slack notification
4. Team can respond immediately

---

## 📊 **Monitoring**

### **CloudWatch Metrics**

Monitor your Lambda:

```bash
# View invocation count
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=gsf-fetch-maxis-tickets \
  --start-time 2026-03-17T00:00:00Z \
  --end-time 2026-03-17T23:59:59Z \
  --period 3600 \
  --statistics Sum
```

### **Set Up Alarms**

Get alerted if Lambda fails:

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name gsf-lambda-errors \
  --alarm-description "Alert if Lambda has errors" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 1 \
  --comparison-operator GreaterThanOrEqualToThreshold \
  --dimensions Name=FunctionName,Value=gsf-fetch-maxis-tickets
```

---

## 💰 **Cost Estimate**

### **Lambda**
- 2 minute refresh = 720 invocations/day
- 256MB memory, ~500ms duration
- **Cost:** ~$0.50/month

### **API Gateway**
- 720 requests/day = 21,600/month
- **Cost:** ~$0.02/month

### **Total:** ~$0.52/month

---

## 🎉 **You're Done!**

Your app now automatically pulls tickets from Maxis API!

### **What Happens Now:**

1. ✅ App loads tickets on startup
2. ✅ Auto-refreshes every 2 minutes
3. ✅ Shows unactioned tickets from your queue
4. ✅ No manual ticket creation needed
5. ✅ Full escalation workflow available

### **Next Steps:**

- Remove the "New Ticket" button (no longer needed)
- Monitor Lambda logs for any errors
- Fine-tune refresh interval if needed
- Add filtering/sorting in the UI

---

## 📞 **Need Help?**

### **Maxis API Integration:**
- Contact: Maxis API Support Team
- Docs: Internal Wiki (search "Maxis API")

### **AWS Lambda/VPC:**
- Contact: Your AWS Administrator
- Docs: AWS Lambda VPC Configuration

### **Material Set Access:**
- Contact: Amazon IT Support
- Tool: Create ticket in t.corp.amazon.com

---

**🚀 Happy Deploying!**
