import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { CheckCircle, Phone, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface ActionPanelProps {
  onActionComplete: (action: string, details: ActionDetails) => void;
}

export interface ActionDetails {
  actionType: string;
  escalationLevel?: string;
  notes: string;
}

export function ActionPanel({ onActionComplete }: ActionPanelProps) {
  const [escalationLevel, setEscalationLevel] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleAction = (action: string) => {
    if (action === "escalate" && !escalationLevel) {
      toast.error("Please select an escalation level");
      return;
    }

    const details: ActionDetails = {
      actionType: action,
      escalationLevel: action === "escalate" ? escalationLevel : undefined,
      notes: notes,
    };

    onActionComplete(action, details);
    setNotes("");
    setEscalationLevel("");
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Action Ticket</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => handleAction("contact-vendor")}
          >
            <Phone className="size-4 mr-2" />
            Contact Vendor
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleAction("mark-completed")}
          >
            <CheckCircle className="size-4 mr-2" />
            Mark Completed
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => handleAction("request-update")}
          >
            <Clock className="size-4 mr-2" />
            Request Update
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => handleAction("escalate")}
          >
            <AlertCircle className="size-4 mr-2" />
            Escalate
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="escalation">Escalation Level</Label>
          <Select value={escalationLevel} onValueChange={setEscalationLevel}>
            <SelectTrigger id="escalation">
              <SelectValue placeholder="Select escalation level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vendor-manager">Vendor Manager</SelectItem>
              <SelectItem value="gsf-leadership">GSF Leadership</SelectItem>
              <SelectItem value="procurement-team">Procurement Team</SelectItem>
              <SelectItem value="site-manager">Site Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Action Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add notes about this action..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </Card>
  );
}