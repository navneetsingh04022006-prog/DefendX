import React, { useState, useEffect } from "react";
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

export default function CreateAlertDialog({ open, onOpenChange, onCreated }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    monitored_user_id: "",
    user_name: "",
    alert_type: "Anomalous Access",
    severity: "Medium",
    status: "Open",
    triggered_at: new Date().toISOString()
  });
  const [saving, setSaving] = useState(false);

  // Seed mock local monitored network identities when modal opens
  useEffect(() => {
    if (open) {
      setUsers([
        { id: "u-1", full_name: "Alex Mercer" },
        { id: "u-2", full_name: "Sarah Connor" },
        { id: "u-3", full_name: "David Lightman" },
      ]);
    }
  }, [open]);

  const handleUserChange = (userId) => {
    const u = users.find(u => u.id === userId);
    setForm({ 
      ...form, 
      monitored_user_id: userId, 
      user_name: u ? u.full_name : "" 
    });
  };

  const handleSave = async () => {
    if (!form.title || !form.description) return;
    setSaving(true);
    
    try {
      // Simulate a local async latency delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      if (onCreated) {
        onCreated({
          id: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
          ...form,
          timestamp: "Just Now"
        });
      }
      
      onOpenChange(false);
      setForm({
        title: "",
        description: "",
        monitored_user_id: "",
        user_name: "",
        alert_type: "Anomalous Access",
        severity: "Medium",
        status: "Open",
        triggered_at: new Date().toISOString()
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px] text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">File Manual Incident Alert</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-2 font-sans">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Incident Title</Label>
            <Input 
              placeholder="e.g., Suspicious Privilege Escalation" 
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium">Target Identity Profile</Label>
            <Select value={form.monitored_user_id} onValueChange={handleUserChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Monitored User" />
              </SelectTrigger>
              <SelectContent>
                {users.map(u => (
                  <SelectItem key={u.id} value={u.id}>{u.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Vector Type</Label>
              <Select 
                value={form.alert_type} 
                onValueChange={(val) => setForm({ ...form, alert_type: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anomalous Access">Anomalous Access</SelectItem>
                  <SelectItem value="Data Exfiltration">Data Exfiltration</SelectItem>
                  <SelectItem value="Brute Force">Brute Force Attack</SelectItem>
                  <SelectItem value="Policy Violation">Policy Violation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Severity Signature</Label>
              <Select 
                value={form.severity} 
                onValueChange={(val) => setForm({ ...form, severity: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="High">High Threat</SelectItem>
                  <SelectItem value="Critical">Critical Breach</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium">Incident Payload Description</Label>
            <Textarea 
              placeholder="Detail peripheral log context flags or abnormal network behavior observations..." 
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
          <Button onClick={handleSave} disabled={saving || !form.title || !form.description}>
            {saving ? "Deploying Threat Log..." : "Deploy Alert"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
