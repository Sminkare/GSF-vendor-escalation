Right! Let's fix the deployment NOW.

The error says it can't find ./services/ticket-api - I gave you the code earlier but you need to upload it to GitHub.

Let me give you a complete checklist of what to upload:

Upload These 2 Files to GitHub:
File 1: src/app/services/ticket-api.ts
Go to GitHub → Add file → Create new file → Name: src/app/services/ticket-api.ts

Paste this:

import { Ticket } from "../components/ticket-list";

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

export function transformMaxisTicket(maxisTicket: MaxisTicket): Ticket {
  const statusMap: Record<string, "pending" | "in-progress" | "completed" | "awaiting-vendor"> = {
    "Pending": "pending",
    "Assigned": "pending",
    "Researching": "in-progress",
    "Work In Progress": "in-progress",
    "Completed": "completed",
    "Closed": "completed",
    "Awaiting Vendor": "awaiting-vendor",
  };

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

export const mockTickets: Ticket[] = [];

export async function fetchTicketsFromAPI(): Promise<Ticket[]> {
  const useAPI = import.meta.env.VITE_USE_API === 'true';
  
  if (!useAPI) {
    console.log('Using mock data / local storage (API mode disabled)');
    await new Promise(resolve => setTimeout(resolve, 300));
    
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
    
    const tickets: Ticket[] = data.tickets.map((maxisTicket: MaxisTicket) => 
      transformMaxisTicket(maxisTicket)
    );

    console.log(`Fetched ${tickets.length} tickets from API`);
    return tickets;
  } catch (error) {
    console.error("Error fetching tickets from Maxis API:", error);
    console.log('Falling back to local storage');
    
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
}

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

export function saveTicketsToStorage(tickets: Ticket[]) {
  try {
    localStorage.setItem('gsf_tickets', JSON.stringify(tickets));
  } catch (e) {
    console.error("Failed to save tickets to local storage", e);
  }
}
