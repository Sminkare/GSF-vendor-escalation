import { useState, useEffect } from "react";
import { TicketList, Ticket } from "./components/ticket-list";
import { TicketDetails } from "./components/ticket-details";
import { ActionPanel, ActionDetails } from "./components/action-panel";
import { EmailComposer, EmailData } from "./components/email-composer";
import { WorkflowStepper, WorkflowStep } from "./components/workflow-stepper";
import { Communications, Communication } from "./components/communications";
import { InformationTab, UploadedFile } from "./components/information-tab";
import { AuditTrail, AuditEvent } from "./components/audit-trail";
import { EventManagement, ServiceEvent } from "./components/event-management";
import { CreateTicketDialog } from "./components/create-ticket-dialog";
import { Sidebar } from "./components/sidebar";
import { AnalyticsView } from "./components/analytics-view";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { fetchTicketsFromAPI, saveTicketsToStorage } from "./services/ticket-api";
import { Button } from "./components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "./components/ui/utils";

export default function App() {
  const [activeView, setActiveView] = useState<"workflow" | "analytics">("workflow");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Load tickets on mount and set up auto-refresh
  useEffect(() => {
    loadTickets();
    
    // Auto-refresh every 2 minutes
    const refreshInterval = setInterval(() => {
      loadTickets(true); // Silent refresh
    }, 2 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Load tickets from API
  const loadTickets = async (silent = false) => {
    if (!silent) {
      setIsLoading(true);
    }
    
    try {
      const fetchedTickets = await fetchTicketsFromAPI();
      setTickets(fetchedTickets);
      setLastRefresh(new Date());
      
      if (!silent && fetchedTickets.length > 0) {
        toast.success(`Loaded ${fetchedTickets.length} tickets from queue`);
      }
    } catch (error) {
      console.error("Failed to load tickets:", error);
      toast.error("Failed to load tickets from API");
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  };

  // Manual refresh
  const handleRefresh = () => {
    toast.info("Refreshing tickets...");
    loadTickets();
  };

  // Create new ticket
  const handleCreateTicket = (newTicket: Ticket) => {
    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    saveTicketsToStorage(updatedTickets);
    setSelectedTicket(newTicket);
    setIsCreateDialogOpen(false);
    
    // Create initial audit trail entry
    const auditEvent: AuditEvent = {
      id: Date.now().toString(),
      timestamp: newTicket.createdDate,
      user: "Current User",
      action: "Ticket Created",
      details: `Ticket ${newTicket.ticketNumber} created manually`,
      type: "status-change",
    };
    
    setTicketAuditEvents((prev) => ({
      ...prev,
      [newTicket.id]: [auditEvent],
    }));
    
    toast.success("Ticket created successfully", {
      description: `${newTicket.ticketNumber} has been added to the queue.`,
    });
  };

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
    saveTicketsToStorage(updatedTickets);
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
    saveTicketsToStorage(updatedTickets);
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
    saveTicketsToStorage(updatedTickets);
    
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
  const [ticketCommunications, setTicketCommunications] = useState<Record<string, Communication[]>>({});

  // Track unread vendor emails per ticket
  const [unreadVendorEmails, setUnreadVendorEmails] = useState<Record<string, number>>({});

  // Files state - store uploaded files per ticket
  const [ticketFiles, setTicketFiles] = useState<Record<string, UploadedFile[]>>({});

  // Audit events state - store audit trail per ticket
  const [ticketAuditEvents, setTicketAuditEvents] = useState<Record<string, AuditEvent[]>>({});

  // Service events state - store events per ticket
  const [ticketEvents, setTicketEvents] = useState<Record<string, ServiceEvent[]>>({});

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Toaster />
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className={cn(
        "flex-1 transition-all duration-300",
        "lg:ml-64"
      )}>
        <div className="p-8">
          <CreateTicketDialog 
            open={isCreateDialogOpen} 
            onOpenChange={setIsCreateDialogOpen}
            onCreateTicket={handleCreateTicket}
          />
          
          {activeView === "analytics" ? (
            <div className="max-w-7xl mx-auto">
              <AnalyticsView tickets={tickets} allAuditEvents={ticketAuditEvents} />
            </div>
          ) : (
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
                    isLoading={isLoading}
                    lastRefresh={lastRefresh}
                  />
                  <div className="mt-4 space-y-2">
                    <Button
                      className="w-full"
                      variant="default"
                      onClick={() => setIsCreateDialogOpen(true)}
                    >
                      + New Ticket
                    </Button>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleRefresh}
                      disabled={isLoading}
                    >
                      <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      {isLoading ? 'Refreshing...' : 'Refresh Tickets'}
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Auto-refreshes every 2 minutes
                  </p>
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
          )}
        </div>
      </div>
    </div>
  );
}