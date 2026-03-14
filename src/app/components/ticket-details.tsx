import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Ticket } from "./ticket-list";
import { MapPin, User, Calendar, AlertCircle } from "lucide-react";

interface TicketDetailsProps {
  ticket: Ticket;
  onUpdateTicket?: (ticketId: string, field: string, value: string) => void;
}

export function TicketDetails({ ticket, onUpdateTicket }: TicketDetailsProps) {
  const handleFieldChange = (field: string, value: string) => {
    if (onUpdateTicket) {
      onUpdateTicket(ticket.id, field, value);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2>{ticket.title}</h2>
            <Badge className="bg-blue-600 text-white">Ticket {ticket.ticketNumber}</Badge>
          </div>
          <div className="flex items-center gap-2">
            {/* Editable Severity */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Severity:</span>
              <Select value={ticket.severity} onValueChange={(value) => handleFieldChange("severity", value)}>
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">SEV 1</SelectItem>
                  <SelectItem value="2">SEV 2</SelectItem>
                  <SelectItem value="3">SEV 3</SelectItem>
                  <SelectItem value="4">SEV 4</SelectItem>
                  <SelectItem value="5">SEV 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Editable Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Select value={ticket.status} onValueChange={(value) => handleFieldChange("status", value)}>
                <SelectTrigger className="w-36 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="awaiting-vendor">Awaiting Vendor</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Vendor</div>
            <div className="text-sm">{ticket.vendor}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Service Type</div>
            <div className="text-sm">{ticket.serviceType}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Site</div>
            <div className="text-sm">{ticket.site}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Location</div>
            <div className="text-sm">{ticket.location}</div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="size-4 text-blue-600 mt-0.5" />
            <div>
              <div className="text-sm mb-1">Physical Address</div>
              <div className="text-sm text-muted-foreground">
                <div>{ticket.physicalAddress.building}</div>
                <div>{ticket.physicalAddress.street}</div>
                <div>
                  {ticket.physicalAddress.city}, {ticket.physicalAddress.state} {ticket.physicalAddress.zipCode}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          {/* Editable Assignee */}
          <div className="flex items-start gap-2">
            <User className="size-4 text-muted-foreground mt-2" />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1">Assignee</div>
              <Select value={ticket.assignee} onValueChange={(value) => handleFieldChange("assignee", value)}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gsf-softservice">gsf-softservice</SelectItem>
                  <SelectItem value="gsf-hardservice">gsf-hardservice</SelectItem>
                  <SelectItem value="facility-ops">facility-ops</SelectItem>
                  <SelectItem value="site-manager">site-manager</SelectItem>
                  <SelectItem value="procurement-team">procurement-team</SelectItem>
                  <SelectItem value="vendor-management">vendor-management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Created</div>
              <div className="text-sm">{ticket.createdDate}</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="size-4 text-orange-600 mt-0.5" />
            <div>
              <div className="text-sm mb-1">Pending Reason</div>
              <div className="text-sm text-muted-foreground">{ticket.pendingReason}</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm mb-2">Description</div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            {ticket.description}
          </div>
        </div>
      </div>
    </Card>
  );
}