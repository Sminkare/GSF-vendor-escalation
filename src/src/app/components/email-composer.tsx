import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Send, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { Ticket } from "./ticket-list";

interface EmailComposerProps {
  ticket: Ticket;
  onEmailSent: (emailData: EmailData) => void;
  initialTemplate?: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
  template: string;
}

export function EmailComposer({ ticket, onEmailSent, initialTemplate = "" }: EmailComposerProps) {
  const [template, setTemplate] = useState<string>(initialTemplate);
  const [to, setTo] = useState<string>(`${ticket.vendor.toLowerCase().replace(/\s+/g, "")}@vendor.com`);
  const [subject, setSubject] = useState<string>(`Escalation: ${ticket.ticketNumber} - ${ticket.item}`);
  const [body, setBody] = useState<string>("");

  const emailTemplates = {
    initial: `Dear ${ticket.vendor} Team,

This is regarding Amazon ticket ${ticket.ticketNumber} that requires your immediate attention.

Ticket Details:
- Ticket Number: ${ticket.ticketNumber}
- Site: ${ticket.site}
- Location: ${ticket.location}
- Service Type: ${ticket.serviceType}
- Severity: ${ticket.severity}
- Status: Pending - ${ticket.pendingReason}

Service Location - Physical Address:
${ticket.physicalAddress.building}
${ticket.physicalAddress.street}
${ticket.physicalAddress.city}, ${ticket.physicalAddress.state} ${ticket.physicalAddress.zipCode}

Detailed description of requested services:
${ticket.description}

We need this issue resolved as soon as possible. Please provide an ETA for completion.

Best regards,
GSF Procurement Operations Team`,
    
    followup: `Dear ${ticket.vendor} Team,

This is a follow-up regarding ticket ${ticket.ticketNumber}.

Original Request Details:
- Ticket Number: ${ticket.ticketNumber}
- Service Type: ${ticket.serviceType}
- Site: ${ticket.site}
- Location: ${ticket.location}

Service Location - Physical Address:
${ticket.physicalAddress.building}
${ticket.physicalAddress.street}
${ticket.physicalAddress.city}, ${ticket.physicalAddress.state} ${ticket.physicalAddress.zipCode}

Detailed description of requested services:
${ticket.description}

Current Status: ${ticket.status}
Pending Reason: ${ticket.pendingReason}

Please provide an update on the technician arrival time and expected completion.

Best regards,
GSF Procurement Operations Team`,
    
    escalation: `Dear ${ticket.vendor} Management,

ESCALATION NOTICE for ticket ${ticket.ticketNumber}

The site has been non-responsive regarding this service request.

This ticket has been pending with reason: ${ticket.pendingReason}
Root Cause: ${ticket.rootCause}

Service Details:
- Type: ${ticket.serviceType}
- Site: ${ticket.site}
- Location: ${ticket.location}
- Severity: ${ticket.severity}
- Created: ${ticket.createdDate}

Service Location - Physical Address:
${ticket.physicalAddress.building}
${ticket.physicalAddress.street}
${ticket.physicalAddress.city}, ${ticket.physicalAddress.state} ${ticket.physicalAddress.zipCode}

Detailed description of requested services:
${ticket.description}

We are looking for confirmation from the site that this issue has been resolved. 

IMPORTANT: If we do not receive a response within 3 business days, this ticket will be automatically resolved and closed.

This is a formal escalation. We require immediate attention and resolution.

GSF Procurement Operations Team`,

    completion: `Dear ${ticket.vendor} Team,

Thank you for completing the service request for ticket ${ticket.ticketNumber}.

Service Completed:
- Type: ${ticket.serviceType}
- Site: ${ticket.site}
- Location: ${ticket.location}

Service Location - Physical Address:
${ticket.physicalAddress.building}
${ticket.physicalAddress.street}
${ticket.physicalAddress.city}, ${ticket.physicalAddress.state} ${ticket.physicalAddress.zipCode}

Detailed description of requested services:
${ticket.description}

We appreciate your prompt attention to this matter. The ticket has been marked as resolved.

Best regards,
GSF Procurement Operations Team`,
  };

  // Auto-load template when initialTemplate prop changes
  useEffect(() => {
    if (initialTemplate && emailTemplates[initialTemplate as keyof typeof emailTemplates]) {
      setTemplate(initialTemplate);
      setBody(emailTemplates[initialTemplate as keyof typeof emailTemplates]);
    }
  }, [initialTemplate]);

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    if (value && emailTemplates[value as keyof typeof emailTemplates]) {
      setBody(emailTemplates[value as keyof typeof emailTemplates]);
    }
  };

  const handleSendEmail = () => {
    if (!to || !subject || !body) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailData: EmailData = {
      to,
      subject,
      body,
      template,
    };

    onEmailSent(emailData);
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Send Email to Vendor</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template">Email Template</Label>
          <Select value={template} onValueChange={handleTemplateChange}>
            <SelectTrigger id="template">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="initial">Initial Contact</SelectItem>
              <SelectItem value="followup">Follow-up Request</SelectItem>
              <SelectItem value="escalation">Escalation Notice</SelectItem>
              <SelectItem value="completion">Completion Confirmation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="vendor@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Message</Label>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Compose your email..."
            rows={12}
          />
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSendEmail}>
            <Send className="size-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline">
            <Paperclip className="size-4 mr-2" />
            Attach
          </Button>
        </div>
      </div>
    </Card>
  );
}