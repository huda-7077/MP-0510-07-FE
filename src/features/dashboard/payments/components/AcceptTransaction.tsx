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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

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
          size={"sm"}
          variant={"destructive"}
          onClick={() => setDeleteDialogOpen(true)}
        >
          Accept
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for accepting this request.
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
            variant={"destructive"}
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
