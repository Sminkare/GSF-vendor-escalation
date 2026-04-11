/**
 * AWS Lambda Function: Fetch Unactioned Tickets from Maxis API
 * 
 * This function:
 * 1. Authenticates with Maxis using Odin credentials
 * 2. Queries for tickets that haven't been actioned
 * 3. Returns them to the frontend app
 * 
 * REQUIREMENTS:
 * - Lambda must be in VPC with access to Amazon internal network
 * - Odin credentials configured in environment
 * - Material set access configured
 */

const https = require('https');
const { URL } = require('url');

/**
 * Environment Variables Required:
 * - MAXIS_ENDPOINT: https://maxis-service-integ-pdx.amazon.com
 * - MATERIAL_SET: your.material.set
 * - AWS_REGION: us-west-2
 */

/**
 * Query for unactioned tickets
 * Based on your ticket queue parameters
 */
const TICKET_QUERY = {
  // Tickets that are pending action
  status: {
    OR: ["Assigned", "Researching", "Work In Progress", "Pending"]
  },
  // Your assigned groups
  assignedGroup: {
    OR: ["GSF Procurement-Soft Services", "SSD-RSR-SPEED"]
  },
  // Your team assignees
  assignee: {
    OR: [
      {
        name: "email-alias:gsf-softservice",
        id: "email-alias:53792899-79aa-43af-8cc4-86656289b27f"
      },
      "kerberos:nobody@ANT.AMAZON.COM",
      {
        name: "email-alias:ssd-rsr-speed-intake",
        id: "email-alias:55a4f372-d3e8-41b0-aed6-b224fc51f7ea"
      }
    ]
  },
  // Only tickets created in the last 30 days
  createdDate: {
    gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
};

/**
 * Main Lambda handler
 */
exports.handler = async (event) => {
  console.log('Fetching tickets from Maxis API...');
  
  try {
    // Get environment configuration
    const maxisEndpoint = process.env.MAXIS_ENDPOINT || 'https://maxis-service-integ-pdx.amazon.com';
    const materialSet = process.env.MATERIAL_SET;
    
    if (!materialSet) {
      throw new Error('MATERIAL_SET environment variable not configured');
    }
    
    // Fetch tickets from Maxis
    const tickets = await fetchTicketsFromMaxis(maxisEndpoint, materialSet);
    
    console.log(`Successfully fetched ${tickets.length} tickets`);
    
    // Return response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Update with your Amplify domain
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        success: true,
        tickets: tickets,
        count: tickets.length,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('Error fetching tickets from Maxis:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        tickets: [],
        count: 0
      })
    };
  }
};

/**
 * Fetch tickets from Maxis API
 * 
 * NOTE: This is a template implementation. You'll need to replace this
 * with the actual Maxis client library or REST API calls.
 * 
 * The actual implementation depends on:
 * 1. Whether Maxis provides a Node.js SDK
 * 2. Whether it's a REST API you can call directly
 * 3. Authentication method (Odin, SigV4, etc.)
 */
async function fetchTicketsFromMaxis(endpoint, materialSet) {
  console.log('Calling Maxis API:', endpoint);
  
  // TODO: Replace with actual Maxis API client
  // 
  // Option 1: If Maxis has a Node.js SDK
  // const MaxisClient = require('@amazon/maxis-client');
  // const client = new MaxisClient({
  //   endpoint: endpoint,
  //   materialSet: materialSet,
  //   credentials: await getOdinCredentials()
  // });
  // return await client.queryIssues(TICKET_QUERY);
  
  // Option 2: If it's a REST API
  // return await callMaxisRestAPI(endpoint, materialSet, TICKET_QUERY);
  
  // Option 3: If you need to use the Java client via a wrapper
  // return await callJavaMaxisClient(endpoint, materialSet, TICKET_QUERY);
  
  
  // TEMPORARY: Return mock data for testing
  // Remove this once you have the actual Maxis client configured
  console.warn('Using mock data - configure Maxis client for production');
  
  return [
    {
      id: "MAXIS-001",
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
    },
    {
      id: "MAXIS-002",
      issueNumber: "V2094350355",
      summary: "[SEA9] [Emergency HVAC Repair]",
      description: "HVAC system failure in building B, affecting multiple floors. Urgent repair needed.",
      status: "Assigned",
      severity: "2",
      assignedGroup: "GSF Procurement-Soft Services",
      assignee: "gsf-softservice",
      requester: "facility-ops",
      createdDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      location: {
        site: "SEA9",
        building: "Building B, Floor 3, Mechanical Room",
        address: {
          street: "410 Terry Avenue North",
          city: "Seattle",
          state: "WA",
          zipCode: "98109"
        }
      },
      category: "GSF Procurement Operations",
      serviceType: "HVAC Maintenance",
      vendor: "Climate Control Solutions",
      pendingReason: "Parts Procurement",
      rootCause: "SEA9-AFS"
    }
  ];
}

/**
 * Get Odin credentials for Maxis authentication
 * 
 * This should integrate with AWS Secrets Manager or Parameter Store
 * to securely retrieve Odin credentials
 */
async function getOdinCredentials() {
  // TODO: Implement Odin credential retrieval
  // const AWS = require('aws-sdk');
  // const secretsManager = new AWS.SecretsManager();
  // const secret = await secretsManager.getSecretValue({
  //   SecretId: 'maxis/odin-credentials'
  // }).promise();
  // return JSON.parse(secret.SecretString);
  
  return {
    materialSet: process.env.MATERIAL_SET
  };
}

/**
 * Call Maxis REST API directly
 * Use this if Maxis exposes a REST API
 */
async function callMaxisRestAPI(endpoint, materialSet, query) {
  return new Promise((resolve, reject) => {
    const url = new URL('/api/issues/query', endpoint);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Material-Set': materialSet,
        // Add other required headers (authentication, etc.)
      }
    };
    
    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.issues || []);
        } catch (err) {
          reject(new Error('Failed to parse Maxis response'));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.write(JSON.stringify(query));
    req.end();
  });
}
