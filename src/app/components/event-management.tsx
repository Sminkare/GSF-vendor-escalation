import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Calendar, Clock, MapPin, Users, Plus, X } from "lucide-react";
import { toast } from "sonner";

export interface ServiceEvent {
  id: string;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  assignedTo: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  createdBy: string;
  createdAt: string;
}

interface EventManagementProps {
  events: ServiceEvent[];
  onAddEvent: (event: ServiceEvent) => void;
  onUpdateEventStatus: (eventId: string, status: ServiceEvent["status"]) => void;
  onDeleteEvent: (eventId: string) => void;
}

export function EventManagement({
  events,
  onAddEvent,
  onUpdateEventStatus,
  onDeleteEvent,
}: EventManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    scheduledDate: "",
    scheduledTime: "",
    location: "",
    assignedTo: "",
  });

  const handleSubmit = () => {
    if (!newEvent.title || !newEvent.scheduledDate || !newEvent.scheduledTime) {
      toast.error("Please fill in required fields");
      return;
    }

    const event: ServiceEvent = {
      id: Date.now().toString(),
      ...newEvent,
      status: "scheduled",
      createdBy: "Current User",
      createdAt: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    onAddEvent(event);
    setNewEvent({
      title: "",
      description: "",
      scheduledDate: "",
      scheduledTime: "",
      location: "",
      assignedTo: "",
    });
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3>Event Management</h3>
        <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
          <Plus className="size-4 mr-2" />
          Schedule Event
        </Button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="text-sm mb-3">Schedule New Event</h4>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="event-title">Event Title *</Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g., Technician Visit, Service Completion"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="event-date">Date *</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEvent.scheduledDate}
                  onChange={(e) => setNewEvent({ ...newEvent, scheduledDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-time">Time *</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={newEvent.scheduledTime}
                  onChange={(e) => setNewEvent({ ...newEvent, scheduledTime: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Building, room, or specific location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-assigned">Assigned To</Label>
              <Input
                id="event-assigned"
                value={newEvent.assignedTo}
                onChange={(e) => setNewEvent({ ...newEvent, assignedTo: e.target.value })}
                placeholder="Name or team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event details..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">
                Create Event
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 text-sm">
            No events scheduled. Click "Schedule Event" to add one.
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm">{event.title}</h4>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteEvent(event.id)}
                  className="flex-shrink-0"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>{event.scheduledDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  <span>{event.scheduledTime}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.assignedTo && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="size-4" />
                    <span>{event.assignedTo}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateEventStatus(event.id, "in-progress")}
                  disabled={event.status === "in-progress" || event.status === "completed"}
                >
                  Start
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateEventStatus(event.id, "completed")}
                  disabled={event.status === "completed"}
                  className="bg-green-50 hover:bg-green-100"
                >
                  Complete
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateEventStatus(event.id, "cancelled")}
                  disabled={event.status === "completed" || event.status === "cancelled"}
                  className="bg-red-50 hover:bg-red-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
