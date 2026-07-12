import { useLocation, Link } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-md w-full border border-border bg-card p-8 rounded-xl shadow-lg text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold text-primary animate-pulse">404</h1>
          <div className="h-0.5 w-16 bg-primary mx-auto"></div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Security Route Unresolved</h2>
          <p className="text-sm text-muted-foreground">
            The requested path <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-xs">/{pageName}</code> could not be identified or accessed within DefendX.
          </p>
        </div>

        <Link 
          to="/" 
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
