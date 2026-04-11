import { useState } from "react";
import { 
  LayoutDashboard, 
  ClipboardList,
  Menu,
  X
} from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../components/ui/utils";

interface SidebarProps {
  activeView: "workflow" | "analytics";
  onViewChange: (view: "workflow" | "analytics") => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { id: "workflow" as const, name: "Workflow", icon: ClipboardList, description: "Manage tickets" },
    { id: "analytics" as const, name: "Analytics", icon: LayoutDashboard, description: "Dashboard & metrics" },
  ];

  return (
    <>
      {/* Toggle Button for Mobile/Small Screens */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-40",
          isCollapsed ? "w-0 -translate-x-full lg:w-20 lg:translate-x-0" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={cn(
            "p-6 border-b border-slate-200",
            isCollapsed && "lg:p-4"
          )}>
            {!isCollapsed ? (
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">GSF Workflow</h2>
                  <p className="text-xs text-slate-500">Vendor Escalation</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex"
                  onClick={() => setIsCollapsed(true)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="w-full hidden lg:flex justify-center"
                onClick={() => setIsCollapsed(false)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      setIsCollapsed(true);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50",
                    isCollapsed && "lg:justify-center lg:px-2"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed && "lg:h-6 lg:w-6")} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* System Status */}
          {!isCollapsed && (
            <div className="p-4 border-t border-slate-200">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">System Active</span>
                </div>
                <p className="text-xs text-green-600">AWS Standalone Mode</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
