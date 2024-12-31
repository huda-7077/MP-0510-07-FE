"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AcceptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  isPending: boolean;
}

const AcceptDialog: React.FC<AcceptDialogProps> = ({
  open,
  onOpenChange,
  onAccept,
  isPending,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Acceptance</DialogTitle>
          <DialogDescription>
            Are you sure you want to accept this request?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onAccept();
              onOpenChange(false);
            }}
            disabled={isPending}
          >
            {isPending ? "Accepting..." : "Accept"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptDialog;
