import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function CreateRuleDialog({ open, onOpenChange, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    severity: "Medium",
    type: "Log Correlation",
    status: "Active"
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.description) return;
    setSaving(true);
    
    try {
      // Simulate a local database insertion delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (onCreated) {
        onCreated({
          id: `RUL-${Math.floor(100 + Math.random() * 900)}`,
          ...form,
          created_at: "Just Now"
        });
      }
      
      onOpenChange(false);
      setForm({
        name: "",
        description: "",
        severity: "Medium",
        type: "Log Correlation",
        status: "Active"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px] text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Deploy Custom Detection Rule</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-2 font-sans">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Rule Name Matrix</Label>
            <Input 
              placeholder="e.g., Detect SSH Brute Force" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Classification Type</Label>
              <Select 
                value={form.type} 
                onValueChange={(val) => setForm({ ...form, type: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Log Correlation">Log Correlation</SelectItem>
                  <SelectItem value="Behavioral Anomaly">Behavioral Anomaly</SelectItem>
                  <SelectItem value="Signature Match">Signature Match</SelectItem>
                  <SelectItem value="Network Flow">Network Flow Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Severity Logic</Label>
              <Select 
                value={form.severity} 
                onValueChange={(val) => setForm({ ...form, severity: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Alert</SelectItem>
                  <SelectItem value="High">High Threat</SelectItem>
                  <SelectItem value="Critical">Critical Logic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium">Rule Logic Condition / Description</Label>
            <Textarea 
              placeholder="Specify the log query match parameters or heuristic thresholds (e.g., status == 401 count > 5)..." 
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Dismiss
          </Button>
          <Button onClick={handleSave} disabled={saving || !form.name || !form.description}>
            {saving ? "Deploying Logic..." : "Deploy Rule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
