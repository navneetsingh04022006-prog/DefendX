import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { 
  Shield, 
  Activity, 
  Users, 
  AlertTriangle, 
  FileText, 
  Brain, 
  Gauge, 
  Sparkles, 
  Zap, 
  Target, 
  BookOpen, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  LogOut 
} from "lucide-react";

const navSections = [
  {
    title: "Monitoring",
    items: [
      { path: "/", label: "Dashboard", icon: Activity },
      { path: "/users", label: "User Profiles", icon: Users },
      { path: "/activity", label: "Activity Log", icon: FileText },
      { path: "/alerts", label: "Alerts", icon: AlertTriangle },
      { path: "/rules", label: "Detection Rules", icon: Shield },
    ]
  },
  {
    title: "AI Engine",
    items: [
      { path: "/ml-engine", label: "ML Engine", icon: Brain },
      { path: "/risk-scoring", label: "Risk Scoring", icon: Gauge },
      { path: "/xai", label: "Explainable AI", icon: Sparkles },
    ]
  },
  {
    title: "Operations",
    items: [
      { path: "/response", label: "Automated Response", icon: Zap },
      { path: "/simulation", label: "Attack Simulation", icon: Target },
      { path: "/architecture", label: "Research Architecture", icon: BookOpen },
      { path: "/presentation", label: "Presentation", icon: BarChart3 },
    ]
  }
];

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Collapsible Sidebar */}
      <aside 
        className={`border-r border-border bg-card flex flex-col justify-between fixed h-full z-20 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex flex-col pt-5 overflow-y-auto overflow-x-hidden">
          {/* Header branding */}
          <div className={`flex items-center justify-between px-4 mb-6 ${collapsed ? "justify-center" : ""}`}>
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary animate-pulse" />
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  DefendX
                </span>
              </div>
            )}
            {collapsed && <Shield className="h-6 w-6 text-primary" />}
          </div>
          
          {/* Nav Categories */}
          <div className="space-y-6 px-3">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                {!collapsed && (
                  <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all group ${
                          isActive
                            ? "bg-primary/10 text-primary border-l-2 border-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        title={collapsed ? item.label : ""}
                      >
                        <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls & Session Profile */}
        <div className="p-3 border-t border-border bg-muted/10 space-y-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center py-1.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          
          {!collapsed && (
            <div className="px-2 py-1.5 rounded bg-muted/30">
              <p className="text-[10px] text-muted-foreground font-mono truncate">Operator Node</p>
              <p className="text-xs font-medium truncate">{user?.username || "SecOps Admin"}</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors w-full ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Terminate Session" : ""}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Terminate Session</span>}
          </button>
        </div>
      </aside>

      {/* Viewport Content Panel */}
      <main className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"}`}>
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
