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
import React from "react";
import * as Yup from "yup";

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReject: (reason: string) => void;
  isPending: boolean;
}

const RejectSchema = Yup.object().shape({
  reason: Yup.string().required("Reason is required"),
});

const RejectDialog: React.FC<RejectDialogProps> = ({
  open,
  onOpenChange,
  onReject,
  isPending,
}) => {
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: RejectSchema,
    onSubmit: (values) => {
      onReject(values.reason);
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this request.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="reason" className="mb-2">
              Reason
            </Label>
            <Textarea
              name="reason"
              placeholder="Enter reason..."
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              style={{ resize: "none" }}
            />
            {!!formik.touched.reason && !!formik.errors.reason ? (
              <p className="text-xs text-red-500">{formik.errors.reason}</p>
            ) : null}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formik.isValid || isPending}>
              {isPending ? "loading..." : "Reject"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RejectDialog;
