import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  Activity, 
  AlertTriangle, 
  FileText, 
  Cpu, 
  ActivitySquare, 
  Eye, 
  Zap, 
  Terminal, 
  LogOut 
} from 'lucide-react';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Alerts Operations', href: '/alerts', icon: AlertTriangle },
    { name: 'Activity Analysis', href: '/activity', icon: Activity },
    { name: 'Detection Rules', href: '/rules', icon: FileText },
    { name: 'User Directory', href: '/users', icon: Users },
    { name: 'ML Intelligence Engine', href: '/ml-engine', icon: Cpu },
    { name: 'Dynamic Risk Scoring', href: '/risk-scoring', icon: ActivitySquare },
    { name: 'Explainable AI (XAI)', href: '/xai', icon: Eye },
    { name: 'Automated Playbooks', href: '/response', icon: Zap },
    { name: 'Adversarial Simulation', href: '/simulation', icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Permanent Sidebar for Desktop */}
      <aside className="w-64 border-r border-border bg-card flex flex-col justify-between fixed h-full z-10">
        <div className="flex flex-col pt-5 overflow-y-auto">
          <div className="flex items-center gap-2 px-6 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              DefendX
            </span>
          </div>
          
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border-l-2 border-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Workspace Info & Logout Action */}
        <div className="p-4 border-t border-border bg-muted/20 space-y-3">
          <div className="flex flex-col px-2">
            <span className="text-xs text-muted-foreground truncate font-mono">Operator Node</span>
            <span className="text-sm font-medium truncate">{user?.username || 'SecOps Admin'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Viewport Container */}
      <main className="flex-1 pl-64 min-h-screen flex flex-col">
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
