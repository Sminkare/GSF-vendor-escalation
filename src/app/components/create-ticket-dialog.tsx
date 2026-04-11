import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Ticket } from "./ticket-list";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTicket: (ticket: Ticket) => void;
}

export function CreateTicketDialog({ open, onOpenChange, onCreateTicket }: CreateTicketDialogProps) {
  const [formData, setFormData] = useState({
    ticketNumber: "",
    title: "",
    vendor: "",
    priority: "none" as "high" | "medium" | "low" | "none",
    status: "pending" as "pending" | "in-progress" | "completed" | "awaiting-vendor",
    severity: "4",
    pendingReason: "",
    rootCause: "",
    category: "GSF Procurement Operations",
    type: "GSF Soft Services",
    item: "",
    site: "",
    location: "",
    building: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    assignee: "gsf-softservice",
    requester: "",
    description: "",
    serviceType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket: Ticket = {
      id: Date.now().toString(),
      ticketNumber: formData.ticketNumber,
      title: formData.title,
      vendor: formData.vendor,
      priority: formData.priority,
      status: formData.status,
      severity: formData.severity,
      pendingReason: formData.pendingReason,
      rootCause: formData.rootCause,
      category: formData.category,
      type: formData.type,
      item: formData.item,
      site: formData.site,
      location: formData.location,
      physicalAddress: {
        building: formData.building,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      assignee: formData.assignee,
      requester: formData.requester,
      createdDate: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      description: formData.description,
      serviceType: formData.serviceType,
    };

    onCreateTicket(newTicket);
    
    // Reset form
    setFormData({
      ticketNumber: "",
      title: "",
      vendor: "",
      priority: "none",
      status: "pending",
      severity: "4",
      pendingReason: "",
      rootCause: "",
      category: "GSF Procurement Operations",
      type: "GSF Soft Services",
      item: "",
      site: "",
      location: "",
      building: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      assignee: "gsf-softservice",
      requester: "",
      description: "",
      serviceType: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Escalation Ticket</DialogTitle>
          <DialogDescription>
            Enter ticket information from the Amazon ticketing system to create a vendor escalation record.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticketNumber">Ticket Number *</Label>
                <Input
                  id="ticketNumber"
                  value={formData.ticketNumber}
                  onChange={(e) => setFormData({ ...formData, ticketNumber: e.target.value })}
                  placeholder="V2094350354"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="severity">Severity *</Label>
                <Select 
                  value={formData.severity} 
                  onValueChange={(value) => setFormData({ ...formData, severity: value })}
                >
                  <SelectTrigger id="severity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">SEV 1 - Critical</SelectItem>
                    <SelectItem value="2">SEV 2 - High</SelectItem>
                    <SelectItem value="3">SEV 3 - Medium</SelectItem>
                    <SelectItem value="4">SEV 4 - Low</SelectItem>
                    <SelectItem value="5">SEV 5 - Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="[MAV2] [Service Type - Issue Description]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site">Site Code *</Label>
                <Input
                  id="site"
                  value={formData.site}
                  onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                  placeholder="MAV2"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type *</Label>
                <Input
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  placeholder="HVAC Maintenance"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of the issue..."
                rows={3}
                required
              />
            </div>
          </div>

          {/* Physical Address */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold text-sm">Physical Address (Required for Vendor Routing)</h3>
            
            <div className="space-y-2">
              <Label htmlFor="building">Building / Location Detail *</Label>
              <Input
                id="building"
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                placeholder="Building 3, Loading Dock B"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="5335 Wisconsin Avenue NW"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Seattle"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="WA"
                  maxLength={2}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="98109"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location Display Name</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Seattle - SEA9-Doppler (Seattle, WA, US)"
              />
            </div>
          </div>

          {/* Vendor & Assignee */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold text-sm">Vendor & Assignment</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor Name *</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                  placeholder="Waste Management Services"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  value={formData.assignee}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  placeholder="gsf-softservice"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requester">Requester</Label>
                <Input
                  id="requester"
                  value={formData.requester}
                  onChange={(e) => setFormData({ ...formData, requester: e.target.value })}
                  placeholder="facility-ops"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger id="status">
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

          {/* Additional Details */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold text-sm">Additional Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pendingReason">Pending Reason</Label>
                <Input
                  id="pendingReason"
                  value={formData.pendingReason}
                  onChange={(e) => setFormData({ ...formData, pendingReason: e.target.value })}
                  placeholder="Arrival of Technician"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rootCause">Root Cause</Label>
                <Input
                  id="rootCause"
                  value={formData.rootCause}
                  onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
                  placeholder="MAV2-AFS"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="item">Item / Category</Label>
              <Input
                id="item"
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                placeholder="Waste/Corrugate Removal - Vendor Escalation"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
