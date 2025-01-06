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
import { X } from "lucide-react";
import React, { useState } from "react";

interface RejectTransactionDialogProps {
  onReject: () => void;
  isPending: boolean;
}

const RejectTransactionDialog: React.FC<RejectTransactionDialogProps> = ({
  onReject,
  isPending,
}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"failed"}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <X />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this request?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onReject();
              setDeleteDialogOpen(false);
            }}
            variant={"destructive"}
            disabled={isPending}
            type="submit"
          >
            {isPending ? "loading..." : "Reject"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectTransactionDialog;
