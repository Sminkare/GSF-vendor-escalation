import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Send, Mail } from "lucide-react";
import { toast } from "sonner";

export interface Communication {
  id: string;
  author: string;
  role: string;
  message: string;
  timestamp: string;
  type?: "internal" | "vendor-email";
  isRead?: boolean;
}

interface CommunicationsProps {
  ticketId: string;
  communications: Communication[];
  onAddCommunication: (message: string) => void;
  unreadCount?: number;
  onSimulateVendorEmail?: () => void;
  onMarkEmailsRead?: (ticketId: string) => void;
  unreadVendorEmails?: number;
}

export function Communications({ 
  ticketId, 
  communications, 
  onAddCommunication, 
  unreadCount = 0,
  onSimulateVendorEmail,
  onMarkEmailsRead,
  unreadVendorEmails = 0
}: CommunicationsProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    onAddCommunication(newMessage);
    setNewMessage("");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isVendorEmail = (comm: Communication) => comm.type === "vendor-email";

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3>Communications - Services Team & Site</h3>
        <div className="flex items-center gap-2">
          {unreadVendorEmails > 0 && (
            <>
              <Badge className="bg-red-600 text-white animate-pulse">
                <Mail className="size-3 mr-1" />
                {unreadVendorEmails} New
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onMarkEmailsRead?.(ticketId)}
                className="text-xs"
              >
                Mark All Read
              </Button>
            </>
          )}
          {onSimulateVendorEmail && (
            <Button
              size="sm"
              variant="outline"
              onClick={onSimulateVendorEmail}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300"
            >
              <Mail className="size-3 mr-1" />
              Simulate Vendor Email
            </Button>
          )}
        </div>
      </div>

      {/* Communications List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {communications.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 text-sm">
            No communications yet. Start the conversation below.
          </div>
        ) : (
          communications.map((comm) => (
            <div 
              key={comm.id} 
              className={`flex gap-3 p-4 rounded-lg border ${
                isVendorEmail(comm) 
                  ? "bg-blue-50 border-blue-200" 
                  : "bg-slate-50 border-slate-200"
              } ${comm.isRead === false ? "ring-2 ring-blue-400" : ""}`}
            >
              <Avatar className="size-10">
                <AvatarFallback className={isVendorEmail(comm) ? "bg-blue-600 text-white" : "bg-blue-600 text-white"}>
                  {getInitials(comm.author)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{comm.author}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{comm.role}</span>
                  {isVendorEmail(comm) && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 text-xs">
                        <Mail className="size-3 mr-1" />
                        Vendor Email
                      </Badge>
                    </>
                  )}
                  {comm.isRead === false && (
                    <Badge className="bg-red-600 text-white text-xs">NEW</Badge>
                  )}
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{comm.timestamp}</span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{comm.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Communication */}
      <div className="space-y-3">
        <div className="text-sm text-muted-foreground">Add Update</div>
        <Textarea
          placeholder="Type your message to the site or services team..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <Button onClick={handleSend} className="w-full bg-blue-600 hover:bg-blue-700">
          <Send className="size-4 mr-2" />
          Send Communication
        </Button>
      </div>
    </Card>
  );
}