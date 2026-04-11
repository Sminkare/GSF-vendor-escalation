import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, AlertCircle } from "lucide-react";
import { RefreshCw } from "lucide-react";

export interface PhysicalAddress {
  building: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  vendor: string;
  priority: "high" | "medium" | "low" | "none";
  status: "pending" | "in-progress" | "completed" | "awaiting-vendor";
  severity: string;
  pendingReason: string;
  rootCause: string;
  category: string;
  type: string;
  item: string;
  site: string;
  location: string;
  physicalAddress: PhysicalAddress;
  assignee: string;
  requester: string;
  createdDate: string;
  description: string;
  serviceType: string;
}

interface TicketListProps {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  onSelectTicket: (ticket: Ticket) => void;
  isLoading?: boolean;
  lastRefresh?: Date;
}

export function TicketList({ tickets, selectedTicket, onSelectTicket, isLoading = false, lastRefresh }: TicketListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="size-4" />;
      case "in-progress": return <AlertCircle className="size-4" />;
      default: return <Clock className="size-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-slate-100 text-slate-800 border-slate-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Escalation Queue</h2>
          <p className="text-sm text-muted-foreground">
            {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} pending action
          </p>
          {lastRefresh && (
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading...
          </div>
        )}
      </div>
      {tickets.length === 0 && !isLoading ? (
        <div className="p-8 text-center text-muted-foreground">
          <p className="mb-2">No tickets in queue</p>
          <p className="text-sm">New tickets will appear here automatically when fetched from the Maxis API.</p>
        </div>
      ) : (
        tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedTicket?.id === ticket.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => onSelectTicket(ticket)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-muted-foreground">{ticket.ticketNumber}</span>
                  <Badge variant="outline" className="text-xs">SEV {ticket.severity}</Badge>
                </div>
                <h3 className="mb-2">{ticket.title}</h3>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Badge className={`${getStatusColor(ticket.status)} flex items-center gap-1`}>
                {getStatusIcon(ticket.status)}
                {ticket.status}
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <div>Site: {ticket.site}</div>
              <div>Pending: {ticket.pendingReason}</div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}