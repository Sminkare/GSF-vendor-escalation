import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, User, Mail, AlertTriangle, CheckCircle, FileText } from "lucide-react";

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  type: "status-change" | "email-sent" | "escalation" | "communication" | "file-upload" | "assignment";
}

interface AuditTrailProps {
  events: AuditEvent[];
}

export function AuditTrail({ events }: AuditTrailProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "status-change":
        return <CheckCircle className="size-5 text-green-600" />;
      case "email-sent":
        return <Mail className="size-5 text-blue-600" />;
      case "escalation":
        return <AlertTriangle className="size-5 text-orange-600" />;
      case "communication":
        return <User className="size-5 text-purple-600" />;
      case "file-upload":
        return <FileText className="size-5 text-cyan-600" />;
      case "assignment":
        return <User className="size-5 text-indigo-600" />;
      default:
        return <Clock className="size-5 text-gray-600" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "status-change":
        return "bg-green-100 text-green-800 border-green-200";
      case "email-sent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "escalation":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "communication":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "file-upload":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "assignment":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Audit Trail</h3>

      {events.length === 0 ? (
        <div className="text-center text-muted-foreground py-8 text-sm">
          No audit events recorded yet
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

          {/* Events */}
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event.id} className="relative flex gap-4">
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center size-12 rounded-full bg-white border-2 border-slate-200">
                  {getEventIcon(event.type)}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{event.action}</span>
                      <Badge variant="outline" className={`text-xs ${getEventColor(event.type)}`}>
                        {event.type.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{event.details}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="size-3" />
                    <span>{event.user}</span>
                    <span>•</span>
                    <Clock className="size-3" />
                    <span>{event.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
