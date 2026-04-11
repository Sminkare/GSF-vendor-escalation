import { Card } from "../components/ui/card";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Building2,
  Zap,
  Mail,
  FileText
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Ticket } from "../components/ticket-list";
import { AuditEvent } from "../components/audit-trail";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"];

interface AnalyticsViewProps {
  tickets: Ticket[];
  allAuditEvents: Record<string, AuditEvent[]>;
}

export function AnalyticsView({ tickets, allAuditEvents }: AnalyticsViewProps) {
  // Calculate metrics
  const totalEscalations = tickets.length;
  const pendingTickets = tickets.filter(t => t.status === "pending").length;
  const inProgressTickets = tickets.filter(t => t.status === "in-progress" || t.status === "awaiting-vendor").length;
  const completedTickets = tickets.filter(t => t.status === "completed").length;
  const avgResolutionTime = "2.3 days"; // Mock data

  // Status distribution data
  const statusData = [
    { id: "pending", name: "Pending", value: pendingTickets },
    { id: "in-progress", name: "In Progress", value: inProgressTickets },
    { id: "completed", name: "Completed", value: completedTickets },
  ];

  // Weekly trend data (mock)
  const weeklyData = [
    { day: "Mon", escalations: 12 },
    { day: "Tue", escalations: 15 },
    { day: "Wed", escalations: 9 },
    { day: "Thu", escalations: 18 },
    { day: "Fri", escalations: 14 },
    { day: "Sat", escalations: 6 },
    { day: "Sun", escalations: 4 },
  ];

  // Vendor performance data
  const vendorCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.vendor] = (acc[ticket.vendor] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topVendors = Object.entries(vendorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([vendor, count]) => ({ vendor, tickets: count }));

  // Audit activity analysis
  const totalAuditEvents = Object.values(allAuditEvents).flat().length;
  const recentAuditEvents = Object.values(allAuditEvents)
    .flat()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const auditEventTypes = Object.values(allAuditEvents)
    .flat()
    .reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time monitoring of GSF vendor escalations and system activity
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Escalations</p>
              <p className="text-3xl font-semibold">{totalEscalations}</p>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Active tracking
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
              <p className="text-3xl font-semibold">{pendingTickets}</p>
              <p className="text-xs text-slate-500 mt-2">Awaiting action</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">In Progress</p>
              <p className="text-3xl font-semibold">{inProgressTickets}</p>
              <p className="text-xs text-slate-500 mt-2">Active tickets</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-semibold">{completedTickets}</p>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Avg: {avgResolutionTime}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Weekly Escalation Trend</h3>
            <p className="text-sm text-muted-foreground">Escalations created in the last 7 days</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
              />
              <Line type="monotone" dataKey="escalations" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Status Distribution */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Status Distribution</h3>
            <p className="text-sm text-muted-foreground">Current escalation status breakdown</p>
          </div>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`pie-cell-${entry.id}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {statusData.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value} tickets</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Vendor Performance & Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Vendors */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Top Vendors</h3>
            <p className="text-sm text-muted-foreground">Most active vendor relationships</p>
          </div>
          <div className="space-y-4">
            {topVendors.length > 0 ? (
              topVendors.map((vendor) => (
                <div key={vendor.vendor} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Building2 className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium">{vendor.vendor}</p>
                      <p className="text-sm text-muted-foreground">{vendor.tickets} tickets</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No vendor data available</p>
            )}
          </div>
        </Card>

        {/* Audit Activity */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Recent Audit Activity</h3>
            <p className="text-sm text-muted-foreground">{totalAuditEvents} total events tracked</p>
          </div>
          <div className="space-y-3">
            {recentAuditEvents.length > 0 ? (
              recentAuditEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    event.type === 'status-change' ? 'bg-blue-100' :
                    event.type === 'email-sent' ? 'bg-green-100' :
                    event.type === 'file-upload' ? 'bg-purple-100' :
                    'bg-slate-100'
                  }`}>
                    {event.type === 'email-sent' ? (
                      <Mail className="h-4 w-4 text-green-600" />
                    ) : event.type === 'file-upload' ? (
                      <FileText className="h-4 w-4 text-purple-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.action}</p>
                    <p className="text-xs text-muted-foreground">{event.details}</p>
                    <p className="text-xs text-slate-400 mt-1">{event.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No audit events yet</p>
            )}
          </div>
        </Card>
      </div>

      {/* Audit Event Type Distribution */}
      {Object.keys(auditEventTypes).length > 0 && (
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Activity Breakdown</h3>
            <p className="text-sm text-muted-foreground">Distribution of system events</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(auditEventTypes).map(([type, count]) => (
              <div key={type} className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-muted-foreground capitalize">{type.replace('-', ' ')}</p>
                <p className="text-2xl font-semibold mt-1">{count}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* System Status */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-600 p-3 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Standalone AWS Mode Active</h3>
            <p className="text-sm text-slate-600 mb-3">
              Your system is running independently with full automation capabilities. 
              No manual ticket creation or external API integration required.
            </p>
            <div className="flex space-x-2">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 border border-green-200 rounded">
                ✓ Fully Operational
              </span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded">
                AWS Deployed
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
