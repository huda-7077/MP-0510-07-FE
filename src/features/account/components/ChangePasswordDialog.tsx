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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useChangePassword from "@/hooks/api/account/useChangePassword";
import { useFormik } from "formik";
import { useState } from "react";
import { ChangePasswordSchema } from "../schemas";

export function ChangePasswordDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, actions) => {
      await changePassword(values);
      actions.setSubmitting(false);
      setIsOpen(false);
      formik.resetForm();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and a new password to change your
            account password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">Current Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your current password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter your new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.newPassword}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Change Password"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
