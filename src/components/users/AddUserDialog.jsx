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
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function AddUserDialog({ open, onOpenChange, onCreated }) {
  const [form, setForm] = useState({ 
    full_name: "", 
    email: "", 
    department: "Engineering", 
    access_level: "Standard", 
    role: "" 
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.full_name || !form.email) return;
    setSaving(true);
    
    try {
      // Simulate a local async database insertion delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      if (onCreated) {
        onCreated({
          id: Math.random().toString(36).substr(2, 9),
          ...form,
          status: "Active",
          last_active: "Just Now"
        });
      }
      
      onOpenChange(false);
      setForm({ 
        full_name: "", 
        email: "", 
        department: "Engineering", 
        access_level: "Standard", 
        role: "" 
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">Add Monitored User</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Full Name</Label>
            <Input 
              placeholder="e.g., Alex Mercer" 
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium">Email Address</Label>
            <Input 
              type="email" 
              placeholder="alex@defendx.internal" 
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium">Role / Title</Label>
            <Input 
              placeholder="e.g., Security Analyst" 
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Department</Label>
              <Select 
                value={form.department} 
                onValueChange={(val) => setForm({ ...form, department: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Access Clearance</Label>
              <Select 
                value={form.access_level} 
                onValueChange={(val) => setForm({ ...form, access_level: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Privilege" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Privileged">Privileged</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !form.full_name || !form.email}>
            {saving ? "Registering..." : "Provision User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
