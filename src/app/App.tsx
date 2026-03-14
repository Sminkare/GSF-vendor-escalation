import { useState } from "react";
import { TicketList, Ticket } from "./components/ticket-list";
import { TicketDetails } from "./components/ticket-details";
import { ActionPanel, ActionDetails } from "./components/action-panel";
import { EmailComposer, EmailData } from "./components/email-composer";
import { WorkflowStepper, WorkflowStep } from "./components/workflow-stepper";
import { Communications, Communication } from "./components/communications";
import { InformationTab, UploadedFile } from "./components/information-tab";
import { AuditTrail, AuditEvent } from "./components/audit-trail";
import { EventManagement, ServiceEvent } from "./components/event-management";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

// Mock data for GSF vendor escalation tickets
const mockTickets: Ticket[] = [
  {
    id: "1",
    ticketNumber: "V2094350354",
    title: "[MAV2] [Trash, Recycling, Compost (Waste) Request]",
    vendor: "Waste Management Services",
    priority: "none",
    status: "pending",
    severity: "4",
    pendingReason: "Arrival of Technician",
    rootCause: "MAV2-AFS",
    category: "GSF Procurement Operations",
    type: "GSF Soft Services",
    item: "Waste/Corrugate Removal - Vendor Escalation",
    site: "MAV2",
    location: "Chevy Chase - MAF1-Mendel (Chevy Chase, MD, US)",
    physicalAddress: {
      building: "Building 3, Loading Dock B",
      street: "5335 Wisconsin Avenue NW",
      city: "Chevy Chase",
      state: "MD",
      zipCode: "20815",
    },
    assignee: "gsf-softservice",
    requester: "zelfonse",
    createdDate: "2026-02-01 8:04:31 AM",
    description: "Two open tops need to be emptied and returned",
    serviceType: "Trash, Recycling, Compost (Waste)",
  },
  {
    id: "2",
    ticketNumber: "V2094350355",
    title: "[SEA9] [Emergency HVAC Repair]",
    vendor: "Climate Control Solutions",
    priority: "high",
    status: "in-progress",
    severity: "2",
    pendingReason: "Parts Procurement",
    rootCause: "SEA9-AFS",
    category: "GSF Procurement Operations",
    type: "GSF Soft Services",
    item: "HVAC - Vendor Escalation",
    site: "SEA9",
    location: "Seattle - SEA9-Doppler (Seattle, WA, US)",
    physicalAddress: {
      building: "Building B, Floor 3, Mechanical Room",
      street: "410 Terry Avenue North",
      city: "Seattle",
      state: "WA",
      zipCode: "98109",
    },
    assignee: "gsf-softservice",
    requester: "facility-ops",
    createdDate: "2026-01-30 2:15:00 PM",
    description: "HVAC system failure in building B, affecting multiple floors. Urgent repair needed.",
    serviceType: "HVAC Maintenance",
  },
  {
    id: "3",
    ticketNumber: "V2094350356",
    title: "[PDX3] [Janitorial Services - Deep Clean]",
    vendor: "Professional Cleaning Co",
    priority: "low",
    status: "pending",
    severity: "5",
    pendingReason: "Scheduling Coordination",
    rootCause: "PDX3-AFS",
    category: "GSF Procurement Operations",
    type: "GSF Soft Services",
    item: "Janitorial Services - Vendor Escalation",
    site: "PDX3",
    location: "Portland - PDX3-Powell (Portland, OR, US)",
    physicalAddress: {
      building: "Warehouse 1, Main Floor",
      street: "1945 SE Powell Boulevard",
      city: "Portland",
      state: "OR",
      zipCode: "97202",
    },
    assignee: "gsf-softservice",
    requester: "site-manager",
    createdDate: "2026-01-28 10:30:00 AM",
    description: "Quarterly deep cleaning service for warehouse facility. Need to coordinate with operations for minimal disruption.",
    serviceType: "Janitorial Services",
  },
];

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(mockTickets[0]);
  const [activeTab, setActiveTab] = useState<string>("action");
  const [emailTemplate, setEmailTemplate] = useState<string>("");
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    { id: 1, title: "Select Ticket", description: "Choose a ticket", completed: true },
    { id: 2, title: "Review Details", description: "Check information", completed: false },
    { id: 3, title: "Action Ticket", description: "Approve or assign", completed: false },
    { id: 4, title: "Send Email", description: "Notify vendor", completed: false },
  ]);
  const [currentStep, setCurrentStep] = useState(2);
  
  // Communications state - store communications per ticket
  const [ticketCommunications, setTicketCommunications] = useState<Record<string, Communication[]>>({
    "1": [
      {
        id: "1",
        author: "Sarah Johnson",
        role: "GSF Procurement",
        message: "Contacted vendor regarding the two open tops. Waiting for confirmation on pickup schedule.",
        timestamp: "2026-02-03 9:15 AM",
        type: "internal",
        isRead: true,
      },
      {
        id: "2",
        author: "Mike Chen",
        role: "Site Manager - MAV2",
        message: "Containers are located at loading dock B. Site contact is available Monday-Friday 8am-5pm.",
        timestamp: "2026-02-03 10:30 AM",
        type: "internal",
        isRead: true,
      },
    ],
    "2": [
      {
        id: "1",
        author: "Alex Rivera",
        role: "Facilities Engineer",
        message: "HVAC unit showing error code E-42. Vendor has been notified and parts are on order.",
        timestamp: "2026-01-31 2:45 PM",
        type: "internal",
        isRead: true,
      },
    ],
    "3": [],
  });

  // Track unread vendor emails per ticket
  const [unreadVendorEmails, setUnreadVendorEmails] = useState<Record<string, number>>({
    "1": 0,
    "2": 0,
    "3": 0,
  });

  // Files state - store uploaded files per ticket
  const [ticketFiles, setTicketFiles] = useState<Record<string, UploadedFile[]>>({
    "1": [],
    "2": [],
    "3": [],
  });

  // Audit events state - store audit trail per ticket
  const [ticketAuditEvents, setTicketAuditEvents] = useState<Record<string, AuditEvent[]>>({
    "1": [
      {
        id: "1",
        timestamp: "2026-02-01 8:04:31 AM",
        user: "zelfonse",
        action: "Ticket Created",
        details: "Ticket V2094350354 created via automated workflow",
        type: "status-change",
      },
      {
        id: "2",
        timestamp: "2026-02-01 10:15 AM",
        user: "gsf-softservice",
        action: "Ticket Assigned",
        details: "Assigned to GSF Soft Services team",
        type: "assignment",
      },
      {
        id: "3",
        timestamp: "2026-02-03 9:15 AM",
        user: "Sarah Johnson",
        action: "Vendor Contacted",
        details: "Initial contact email sent to Waste Management Services",
        type: "email-sent",
      },
    ],
    "2": [],
    "3": [],
  });

  // Service events state - store events per ticket
  const [ticketEvents, setTicketEvents] = useState<Record<string, ServiceEvent[]>>({
    "1": [
      {
        id: "1",
        title: "Scheduled Pickup",
        description: "Vendor scheduled to pick up two open top containers",
        scheduledDate: "2026-02-08",
        scheduledTime: "10:00",
        location: "Loading Dock B",
        assignedTo: "Waste Management Services",
        status: "scheduled",
        createdBy: "Sarah Johnson",
        createdAt: "2026-02-03 9:30 AM",
      },
    ],
    "2": [
      {
        id: "1",
        title: "Parts Delivery",
        description: "HVAC replacement parts arriving",
        scheduledDate: "2026-02-05",
        scheduledTime: "14:00",
        location: "SEA9 Building B",
        assignedTo: "Climate Control Solutions",
        status: "in-progress",
        createdBy: "Alex Rivera",
        createdAt: "2026-01-31 3:15 PM",
      },
    ],
    "3": [],
  });

  const handleActionComplete = (action: string, details: ActionDetails) => {
    if (!selectedTicket) return;

    let newStatus: "pending" | "in-progress" | "completed" | "awaiting-vendor" = selectedTicket.status;
    let actionMessage = "";
    
    if (action === "contact-vendor") {
      newStatus = "awaiting-vendor";
      actionMessage = "Vendor contacted successfully";
      toast.success(actionMessage, {
        description: `${selectedTicket.ticketNumber} - Awaiting vendor response.`,
      });
      
      // Switch to email tab and pre-fill template
      setActiveTab("email");
      setEmailTemplate("initial");
    } else if (action === "mark-completed") {
      newStatus = "completed";
      actionMessage = "Ticket marked as completed";
      toast.success(actionMessage, {
        description: `${selectedTicket.ticketNumber} has been resolved.`,
      });
    } else if (action === "request-update") {
      newStatus = "in-progress";
      actionMessage = "Update requested from vendor";
      toast.info(actionMessage, {
        description: `${selectedTicket.ticketNumber} - Waiting for vendor update.`,
      });
      
      // Switch to email tab and pre-fill follow-up template
      setActiveTab("email");
      setEmailTemplate("followup");
    } else if (action === "escalate") {
      newStatus = "in-progress";
      actionMessage = `Ticket escalated to ${details.escalationLevel?.replace("-", " ")}`;
      toast.warning(actionMessage, {
        description: `${selectedTicket.ticketNumber} has been escalated.`,
      });
      
      // Switch to email tab and pre-fill escalation template
      setActiveTab("email");
      setEmailTemplate("escalation");
    }

    // Update ticket status
    const updatedTickets = tickets.map(ticket =>
      ticket.id === selectedTicket.id ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
    setSelectedTicket({ ...selectedTicket, status: newStatus });

    // Update workflow
    const updatedSteps = workflowSteps.map(step =>
      step.id === 3 ? { ...step, completed: true } : step
    );
    setWorkflowSteps(updatedSteps);
    setCurrentStep(4);
  };

  const handleEmailSent = (emailData: EmailData) => {
    if (!selectedTicket) return;

    toast.success("Email sent successfully", {
      description: `Email sent to ${emailData.to} regarding ${selectedTicket.ticketNumber}`,
    });

    // Update workflow
    const updatedSteps = workflowSteps.map(step =>
      step.id === 4 ? { ...step, completed: true } : step
    );
    setWorkflowSteps(updatedSteps);

    // Mark ticket as completed
    const updatedTickets = tickets.map(ticket =>
      ticket.id === selectedTicket.id ? { ...ticket, status: "completed" as const } : ticket
    );
    setTickets(updatedTickets);
    setSelectedTicket({ ...selectedTicket, status: "completed" });
  };

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    // Reset workflow when selecting a new ticket
    setWorkflowSteps([
      { id: 1, title: "Select Ticket", description: "Choose a ticket", completed: true },
      { id: 2, title: "Review Details", description: "Check information", completed: false },
      { id: 3, title: "Action Ticket", description: "Approve or assign", completed: false },
      { id: 4, title: "Send Email", description: "Notify vendor", completed: false },
    ]);
    setCurrentStep(2);
    // Reset tab and email template
    setActiveTab("action");
    setEmailTemplate("");
  };

  const handleAddCommunication = (message: string) => {
    if (!selectedTicket) return;

    const newComm: Communication = {
      id: Date.now().toString(),
      author: "Current User", // In a real app, this would be the logged-in user
      role: "GSF Procurement Team",
      message: message,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      type: "internal",
      isRead: true,
    };

    setTicketCommunications((prev) => ({
      ...prev,
      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), newComm],
    }));

    toast.success("Communication added", {
      description: "Your message has been posted to the ticket",
    });
  };

  // Simulate receiving a vendor email
  const handleSimulateVendorEmail = () => {
    if (!selectedTicket) return;

    const vendorResponses = [
      "Thank you for your email. We have scheduled a technician to arrive on-site tomorrow between 10am-2pm. Ticket reference: " + selectedTicket.ticketNumber,
      "We acknowledge receipt of your request. Our team is currently reviewing the scope of work and will provide an ETA within 24 hours.",
      "The parts needed for this service have been ordered and should arrive by end of week. We will schedule the repair once parts are received.",
      "Our technician has completed the service as requested. Please review and confirm completion at your earliest convenience.",
      "We apologize for the delay. Due to high demand, we are rescheduling your service to the next available slot. Our dispatcher will contact you shortly.",
    ];

    const randomResponse = vendorResponses[Math.floor(Math.random() * vendorResponses.length)];

    const vendorEmail: Communication = {
      id: Date.now().toString(),
      author: selectedTicket.vendor,
      role: "Vendor Representative",
      message: randomResponse,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      type: "vendor-email",
      isRead: false,
    };

    setTicketCommunications((prev) => ({
      ...prev,
      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), vendorEmail],
    }));

    setUnreadVendorEmails((prev) => ({
      ...prev,
      [selectedTicket.id]: (prev[selectedTicket.id] || 0) + 1,
    }));

    // Add to audit trail
    const auditEvent: AuditEvent = {
      id: Date.now().toString(),
      timestamp: vendorEmail.timestamp,
      user: selectedTicket.vendor,
      action: "Vendor Email Received",
      details: `Email received from ${selectedTicket.vendor}`,
      type: "email-sent",
    };

    setTicketAuditEvents((prev) => ({
      ...prev,
      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), auditEvent],
    }));

    toast.success("New vendor email received!", {
      description: `Email from ${selectedTicket.vendor}`,
      duration: 5000,
    });
  };

  // Mark emails as read when viewing communications
  const handleMarkEmailsRead = (ticketId: string) => {
    setTicketCommunications((prev) => ({
      ...prev,
      [ticketId]: (prev[ticketId] || []).map((comm) => ({
        ...comm,
        isRead: true,
      })),
    }));

    setUnreadVendorEmails((prev) => ({
      ...prev,
      [ticketId]: 0,
    }));
  };

  // Handler for updating ticket fields
  const handleUpdateTicket = (ticketId: string, field: string, value: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        const updatedTicket = { ...ticket };
        if (field === "severity") {
          updatedTicket.severity = value;
        } else if (field === "status") {
          updatedTicket.status = value as any;
        } else if (field === "assignee") {
          updatedTicket.assignee = value;
        }
        return updatedTicket;
      }
      return ticket;
    });

    setTickets(updatedTickets);
    
    // Update selected ticket
    if (selectedTicket?.id === ticketId) {
      const updated = updatedTickets.find((t) => t.id === ticketId);
      if (updated) {
        setSelectedTicket(updated);
      }
    }

    // Add audit event
    const auditEvent: AuditEvent = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      user: "Current User",
      action: `${field.charAt(0).toUpperCase() + field.slice(1)} Updated`,
      details: `${field.charAt(0).toUpperCase() + field.slice(1)} changed to ${value}`,
      type: "status-change",
    };

    setTicketAuditEvents((prev) => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), auditEvent],
    }));

    toast.success("Ticket updated", {
      description: `${field.charAt(0).toUpperCase() + field.slice(1)} has been updated`,
    });
  };

  // Handlers for Information Tab
  const handleFileUpload = (file: UploadedFile) => {
    if (!selectedTicket) return;
    setTicketFiles((prev) => ({
      ...prev,
      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), file],
    }));

    // Add audit event
    const auditEvent: AuditEvent = {
      id: Date.now().toString(),
      timestamp: file.uploadedAt,
      user: file.uploadedBy,
      action: "File Uploaded",
      details: `Uploaded ${file.name} (${file.category})`,
      type: "file-upload",
    };
    setTicketAuditEvents((prev) => ({
      ...prev,
      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), auditEvent],
    }));
  };

  const handleFileDelete = (fileId: string) => {
    if (!selectedTicket) return;
    setTicketFiles((prev) => ({
      ...prev,
      [selectedTicket.id]: (prev[selectedTicket.id] || []).filter((f) => f.id !== fileId),
    }));
    toast.success("File deleted");
  };

  // Handlers for Event Management
  const handleAddEvent = (event: ServiceEvent) => {
    if (!selectedTicket) return;
    setTicketEvents((prev) => ({
      ...prev,
      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), event],
    }));
    toast.success("Event scheduled", {
      description: `${event.title} added to calendar`,
    });

    // Add audit event
    const auditEvent: AuditEvent = {
      id: Date.now().toString(),
      timestamp: event.createdAt,
      user: event.createdBy,
      action: "Event Scheduled",
      details: `${event.title} scheduled for ${event.scheduledDate} at ${event.scheduledTime}`,
      type: "communication",
    };
    setTicketAuditEvents((prev) => ({
      ...prev,
      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), auditEvent],
    }));
  };

  const handleUpdateEventStatus = (eventId: string, status: ServiceEvent["status"]) => {
    if (!selectedTicket) return;
    setTicketEvents((prev) => ({
      ...prev,
      [selectedTicket.id]: (prev[selectedTicket.id] || []).map((e) =>
        e.id === eventId ? { ...e, status } : e
      ),
    }));
    toast.success(`Event status updated to ${status}`);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (!selectedTicket) return;
    setTicketEvents((prev) => ({
      ...prev,
      [selectedTicket.id]: (prev[selectedTicket.id] || []).filter((e) => e.id !== eventId),
    }));
    toast.success("Event deleted");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Toaster />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">GSF Vendor Escalation Workflow</h1>
          <p className="text-muted-foreground">
            Manage GSF procurement tickets and communicate with vendors
          </p>
        </div>

        {/* Workflow Stepper */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <WorkflowStepper steps={workflowSteps} currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Ticket List */}
          <div className="col-span-1">
            <TicketList
              tickets={tickets}
              selectedTicket={selectedTicket}
              onSelectTicket={handleSelectTicket}
            />
          </div>

          {/* Right Column - Ticket Details and Actions */}
          <div className="col-span-2 space-y-6">
            {selectedTicket ? (
              <>
                <TicketDetails ticket={selectedTicket} onUpdateTicket={handleUpdateTicket} />
                
                {/* Communications Section */}
                <Communications
                  ticketId={selectedTicket.id}
                  communications={ticketCommunications[selectedTicket.id] || []}
                  onAddCommunication={handleAddCommunication}
                  onSimulateVendorEmail={handleSimulateVendorEmail}
                  onMarkEmailsRead={handleMarkEmailsRead}
                  unreadVendorEmails={unreadVendorEmails[selectedTicket.id] || 0}
                />
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="action">Action</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="information">Information</TabsTrigger>
                    <TabsTrigger value="audit">Audit Trail</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="action" className="mt-4">
                    <ActionPanel onActionComplete={handleActionComplete} />
                  </TabsContent>
                  
                  <TabsContent value="email" className="mt-4">
                    <EmailComposer 
                      ticket={selectedTicket} 
                      onEmailSent={handleEmailSent}
                      initialTemplate={emailTemplate}
                    />
                  </TabsContent>

                  <TabsContent value="information" className="mt-4">
                    <InformationTab
                      files={ticketFiles[selectedTicket.id] || []}
                      onFileUpload={handleFileUpload}
                      onFileDelete={handleFileDelete}
                    />
                  </TabsContent>

                  <TabsContent value="audit" className="mt-4">
                    <AuditTrail events={ticketAuditEvents[selectedTicket.id] || []} />
                  </TabsContent>

                  <TabsContent value="events" className="mt-4">
                    <EventManagement
                      events={ticketEvents[selectedTicket.id] || []}
                      onAddEvent={handleAddEvent}
                      onUpdateEventStatus={handleUpdateEventStatus}
                      onDeleteEvent={handleDeleteEvent}
                    />
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center text-muted-foreground">
                Select a ticket to view details and take action
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}