"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Trash2Icon } from "lucide-react";
import { deleteUser } from "../../server/user";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteUserBtn({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (loading) return;
    setLoading(true);
    try {
      await deleteUser(userId);
      toast.success("User deleted");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          <Trash2Icon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between gap-4 mt-4">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="min-w-[160px]"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Deleting..." : "Yes, delete my account"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={loading}>Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
