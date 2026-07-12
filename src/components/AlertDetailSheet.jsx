import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SeverityBadge from "@/components/shared/SeverityBadge";
import StatusBadge from "@/components/shared/StatusBadge";

export default function AlertDetailSheet({ alert, onClose, onUpdated }) {
  if (!alert) return null;

  const [status, setStatus] = useState(alert.status || "Open");
  const [notes, setNotes] = useState(alert.resolution_notes || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate a local async update delay for the incident state
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (onUpdated) {
        onUpdated({
          ...alert,
          status,
          resolution_notes: notes,
        });
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent className="bg-card border-border w-full sm:max-w-lg overflow-auto text-foreground">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-bold tracking-tight">
            {alert.title || "Incident Details"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6 font-sans">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30 border border-border font-mono text-xs">
            <div className="space-y-1">
              <span className="text-muted-foreground block">Alert ID</span>
              <span className="text-foreground font-medium select-all">{alert.id}</span>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground block">Timestamp</span>
              <span className="text-foreground font-medium">{alert.timestamp || "Just Now"}</span>
            </div>
            <div className="space-y-1 pt-2">
              <span className="text-muted-foreground block mb-1">Severity Matrix</span>
              <SeverityBadge severity={alert.severity} />
            </div>
            <div className="space-y-1 pt-2">
              <span className="text-muted-foreground block mb-1">Current State</span>
              <StatusBadge status={status} />
            </div>
          </div>

          {/* Description Block */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Incident Vector & Description
            </Label>
            <div className="p-3 bg-muted/10 border border-border rounded text-sm leading-relaxed">
              {alert.description || "No supplemental details recorded for this perimeter signature."}
            </div>
          </div>

          <hr className="border-border" />

          {/* Remediation Controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Update Disposition</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open (Unassigned)</SelectItem>
                  <SelectItem value="In Progress">Triage / Investigating</SelectItem>
                  <SelectItem value="Resolved">Resolved & Closed</SelectItem>
                  <SelectItem value="Dismissed">Dismissed (False Positive)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Resolution Notes / Audit Trail</Label>
              <Textarea
                placeholder="Specify root cause finding, mitigation actions taken, or escalation context..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] bg-background resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving Changes..." : "Commit Analysis"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
