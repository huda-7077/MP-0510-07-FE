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
import { Check } from "lucide-react";
import React, { useState } from "react";

interface AcceptTransactionDialogProps {
  onAccept: () => void;
  isPending: boolean;
}

const AcceptTransactionDialog: React.FC<AcceptTransactionDialogProps> = ({
  onAccept,
  isPending,
}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"success"}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Check />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to accept this request?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onAccept();
              setDeleteDialogOpen(false);
            }}
            disabled={isPending}
            type="submit"
          >
            {isPending ? "loading..." : "Accept"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptTransactionDialog;
