"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "@/components/forms/UserForm";
import { useRouter } from "next/navigation";

export default function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
  <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Add User <UserPlusIcon size={16} /></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new user.
            </DialogDescription>
            <UserForm onSuccess={() => { setOpen(false); router.refresh(); }} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
