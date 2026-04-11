# AWS Serverless Backend for GSF Escalation Workflow

Since you want to start from scratch with a fully automated AWS API (bypassing the Maxis API restrictions), here is the complete AWS architecture and code to deploy this backend. 

You can deploy this using the **AWS Serverless Application Model (SAM)** or hand this to your cloud team.

## 1. Architecture

*   **Amazon API Gateway:** Provides the REST API endpoints.
*   **AWS Lambda:** Handles the business logic (Node.js/TypeScript).
*   **Amazon DynamoDB:** Stores the tickets, communications, and audit trails.

## 2. Infrastructure as Code (`template.yaml`)

Create a `template.yaml` file in your project root:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: GSF Escalation Ticketing API

Globals:
  Function:
    Timeout: 15
    MemorySize: 256
    Runtime: nodejs20.x
    Environment:
      Variables:
        TICKETS_TABLE: !Ref TicketsTable

Resources:
  TicketsTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: gsf-escalation-tickets
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH

  GetTicketsFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: api/
      Handler: handler.getTickets
      Policies:
        - DynamoDBReadPolicy:
            TableName: !Ref TicketsTable
      Events:
        Api:
          Type: Api
          Properties:
            Path: /api/tickets
            Method: GET

  CreateTicketFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: api/
      Handler: handler.createTicket
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref TicketsTable
      Events:
        Api:
          Type: Api
          Properties:
            Path: /api/tickets
            Method: POST

Outputs:
  ApiEndpoint:
    Description: "API Gateway endpoint URL"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/api/tickets"
```

## 3. Lambda Backend Code (`api/handler.js`)

Create a folder named `api` and place this code in `api/handler.js`.

```javascript
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TICKETS_TABLE;

// GET /api/tickets
exports.getTickets = async (event) => {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ tickets: data.Items }),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not fetch tickets" }) };
  }
};

// POST /api/tickets
exports.createTicket = async (event) => {
  try {
    const body = JSON.stringify(event.body);
    const newTicket = {
      id: crypto.randomUUID(),
      createdDate: new Date().toISOString(),
      ...body
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: newTicket
    }));

    return {
      statusCode: 201,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(newTicket),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not create ticket" }) };
  }
};
```

## 4. How to Deploy

1. Ensure you have the AWS CLI and AWS SAM CLI installed.
2. Run `sam build`
3. Run `sam deploy --guided`
4. Copy the output `ApiEndpoint` URL.

## 5. Linking to the Frontend

Once deployed, simply update your frontend environment variable to point to your new AWS API instead of Maxis.

In your project environment (e.g. `.env` file):

```env
VITE_USE_API=true
VITE_MAXIS_API_ENDPOINT="https://<your-api-id>.execute-api.<region>.amazonaws.com/Prod/api/tickets"
```

The frontend will automatically start fetching and sending data to your new standalone AWS DynamoDB backend!
