"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

interface DeleteEventDialogProps {
  onDelete: () => void;
  isPending: boolean;
}

const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({
  onDelete,
  isPending,
}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant={"destructive"}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this event?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete();
              setDeleteDialogOpen(false);
            }}
            variant={"destructive"}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventDialog;
