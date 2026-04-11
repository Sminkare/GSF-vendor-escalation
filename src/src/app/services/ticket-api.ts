import { Ticket } from "../components/ticket-list";

/**
 * Service for interacting with the Maxis ticketing API
 */

export interface MaxisTicket {
  id: string;
  issueNumber: string;
  summary: string;
  description: string;
  status: string;
  severity?: string;
  assignedGroup?: string;
  assignee?: string;
  requester?: string;
  createdDate: string;
  location?: {
    site?: string;
    building?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    };
  };
  category?: string;
  serviceType?: string;
  vendor?: string;
  pendingReason?: string;
  rootCause?: string;
}

/**
 * Transform Maxis API ticket to app Ticket format
 */
export function transformMaxisTicket(maxisTicket: MaxisTicket): Ticket {
  // Map Maxis status to app status
  const statusMap: Record<string, "pending" | "in-progress" | "completed" | "awaiting-vendor"> = {
    "Pending": "pending",
    "Assigned": "pending",
    "Researching": "in-progress",
    "Work In Progress": "in-progress",
    "Completed": "completed",
    "Closed": "completed",
    "Awaiting Vendor": "awaiting-vendor",
  };

  // Determine priority based on severity
  const priorityMap: Record<string, "high" | "medium" | "low" | "none"> = {
    "1": "high",
    "2": "high",
    "3": "medium",
    "4": "low",
    "5": "low",
  };

  const severity = maxisTicket.severity || "4";
  const status = statusMap[maxisTicket.status] || "pending";
  const priority = priorityMap[severity] || "none";

  return {
    id: maxisTicket.id,
    ticketNumber: maxisTicket.issueNumber,
    title: maxisTicket.summary || `[${maxisTicket.location?.site || "UNKNOWN"}] ${maxisTicket.serviceType || "Service Request"}`,
    vendor: maxisTicket.vendor || "Unknown Vendor",
    priority: priority,
    status: status,
    severity: severity,
    pendingReason: maxisTicket.pendingReason || "Pending Action",
    rootCause: maxisTicket.rootCause || `${maxisTicket.location?.site || "UNKNOWN"}-AFS`,
    category: maxisTicket.category || "GSF Procurement Operations",
    type: "GSF Soft Services",
    item: maxisTicket.serviceType || "Service Request - Vendor Escalation",
    site: maxisTicket.location?.site || "UNKNOWN",
    location: formatLocation(maxisTicket.location),
    physicalAddress: {
      building: maxisTicket.location?.building || "Building Unknown",
      street: maxisTicket.location?.address?.street || "",
      city: maxisTicket.location?.address?.city || "",
      state: maxisTicket.location?.address?.state || "",
      zipCode: maxisTicket.location?.address?.zipCode || "",
    },
    assignee: maxisTicket.assignee || "gsf-softservice",
    requester: maxisTicket.requester || "unknown",
    createdDate: formatDate(maxisTicket.createdDate),
    description: maxisTicket.description || "No description provided",
    serviceType: maxisTicket.serviceType || "General Service",
  };
}

/**
 * Format location for display
 */
function formatLocation(location?: MaxisTicket["location"]): string {
  if (!location) return "Location Unknown";
  
  const parts = [];
  if (location.site) parts.push(location.site);
  if (location.building) parts.push(location.building);
  if (location.address?.city && location.address?.state) {
    parts.push(`(${location.address.city}, ${location.address.state})`);
  }
  
  return parts.join(" - ") || "Location Unknown";
}

/**
 * Format date from ISO to readable format
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return dateString;
  }
}

// Use an empty array for mock tickets so the queue starts empty
export const mockTickets: Ticket[] = [];

/**
 * Fetch tickets from Maxis API via Lambda backend
 */
export async function fetchTicketsFromAPI(): Promise<Ticket[]> {
  // Check if API mode is enabled
  const useAPI = import.meta.env.VITE_USE_API === 'true';
  
  if (!useAPI) {
    console.log('Using mock data / local storage (API mode disabled)');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Load from local storage
    try {
      const saved = localStorage.getItem('gsf_tickets');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load tickets from local storage", e);
    }
    return [];
  }

  try {
    // TODO: Replace with your actual Lambda API endpoint URL
    // This will be created when you deploy the Lambda function
    const apiEndpoint = import.meta.env.VITE_MAXIS_API_ENDPOINT || "/api/tickets";
    
    console.log('Fetching tickets from API:', apiEndpoint);
    
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform Maxis tickets to app format
    const tickets: Ticket[] = data.tickets.map((maxisTicket: MaxisTicket) => 
      transformMaxisTicket(maxisTicket)
    );

    console.log(`Fetched ${tickets.length} tickets from API`);
    return tickets;
  } catch (error) {
    console.error("Error fetching tickets from Maxis API:", error);
    console.log('Falling back to mock data');
    // Fall back to mock data if API fails
    return generateMockTickets();
  }
}

/**
 * Fetch a single ticket by ID from Maxis API
 */
export async function fetchTicketById(ticketId: string): Promise<Ticket | null> {
  try {
    const apiEndpoint = import.meta.env.VITE_MAXIS_API_ENDPOINT || "/api/tickets";
    
    const response = await fetch(`${apiEndpoint}/${ticketId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const maxisTicket: MaxisTicket = await response.json();
    return transformMaxisTicket(maxisTicket);
  } catch (error) {
    console.error(`Error fetching ticket ${ticketId}:`, error);
    throw error;
  }
}

/**
 * Save tickets to LocalStorage when not using real API
 */
export function saveTicketsToStorage(tickets: Ticket[]) {
  try {
    localStorage.setItem('gsf_tickets', JSON.stringify(tickets));
  } catch (e) {
    console.error("Failed to save tickets to local storage", e);
  }
}