import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LogEventDialog({ open, onOpenChange, event }) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Event Log Detail
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4 font-mono text-xs">
          <div className="grid grid-cols-3 gap-2 border-b border-border pb-2">
            <span className="text-muted-foreground font-semibold">Event ID:</span>
            <span className="col-span-2 text-foreground select-all">{event.id}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-border pb-2">
            <span className="text-muted-foreground font-semibold">Timestamp:</span>
            <span className="col-span-2 text-foreground">{event.timestamp || "N/A"}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-border pb-2">
            <span className="text-muted-foreground font-semibold">Event Type:</span>
            <span className="col-span-2">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                {event.event_type || event.type || "System"}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-border pb-2">
            <span className="text-muted-foreground font-semibold">Severity:</span>
            <span className="col-span-2">
              <span className={`px-2 py-0.5 rounded font-semibold ${
                event.severity === "High" || event.severity === "Critical"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-yellow-500/10 text-yellow-500"
              }`}>
                {event.severity || "Low"}
              </span>
            </span>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-muted-foreground font-semibold block">Description:</span>
            <div className="p-3 bg-muted/40 border border-border rounded text-foreground font-sans leading-relaxed">
              {event.description || "No description provided for this incident log snapshot."}
            </div>
          </div>

          {event.metadata && (
            <div className="space-y-1.5">
              <span className="text-muted-foreground font-semibold block">Payload Metadata:</span>
              <pre className="p-3 bg-muted/80 border border-border rounded overflow-x-auto text-cyan-400 max-h-40">
                {typeof event.metadata === "object" 
                  ? JSON.stringify(event.metadata, null, 2) 
                  : event.metadata}
              </pre>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Dismiss Audit View
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
