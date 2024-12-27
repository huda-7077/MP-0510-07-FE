"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplyOrganizerSchema } from "../schemas";
import { useSession } from "next-auth/react";
import Image from "next/image";
import useApplyAsOrganizer from "@/hooks/api/account/useApplyAsOrganizer";

export function ApplyOrganizerDialog() {
  const { data: session } = useSession();
  const token = session?.user.token;
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: applyAsOrganizer, isPending } = useApplyAsOrganizer(
    token!,
  );

  const [selectedImage, setSelectedImage] = useState<string>("");
  const governmentIdRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      governmentId: null,
      companyName: "",
      companyWebsite: "",
      companyAddress: "",
      companyRole: "",
      details: "",
    },
    validationSchema: ApplyOrganizerSchema,
    onSubmit: async (values, actions) => {
      await applyAsOrganizer(values);
      actions.setSubmitting(false);
      setIsOpen(false);
      formik.resetForm();
    },
  });

  const handleGovernmentIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      formik.setFieldValue("governmentId", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveGovernmentId = () => {
    formik.setFieldValue("governmentId", null);
    setSelectedImage("");
    if (governmentIdRef.current) {
      governmentIdRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Apply as Organizer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply as Organizer</DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for organizer status.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="max-h-[60vh] space-y-4 overflow-y-auto p-2"
        >
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="Enter your company name"
              type="text"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.companyName && formik.touched.companyName && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.companyName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyWebsite">Company Website</Label>
            <Input
              id="companyWebsite"
              name="companyWebsite"
              placeholder="Enter your company website"
              type="url"
              value={formik.values.companyWebsite}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.companyWebsite && formik.touched.companyWebsite && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.companyWebsite}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyAddress">Company Address</Label>
            <Input
              id="companyAddress"
              name="companyAddress"
              placeholder="Enter your company address"
              type="text"
              value={formik.values.companyAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.companyAddress && formik.touched.companyAddress && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.companyAddress}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyRole">Role in Company</Label>
            <Input
              id="companyRole"
              name="companyRole"
              placeholder="Enter your role in the company"
              type="text"
              value={formik.values.companyRole}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.companyRole && formik.touched.companyRole && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.companyRole}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="details">Company Details</Label>
            <Textarea
              id="details"
              name="details"
              placeholder="Provide details about your company"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.details && formik.touched.details && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.details}
              </p>
            )}
          </div>
          {selectedImage && (
            <div className="relative mx-auto h-[210px] w-[330px]">
              <Image
                src={selectedImage}
                alt="Government ID"
                fill
                className="rounded-md object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveGovernmentId}
                className="absolute right-2 top-2 rounded-full bg-white p-1 text-black hover:bg-gray-200"
              >
                &times;
              </button>
            </div>
          )}
          <Input
            ref={governmentIdRef}
            type="file"
            accept="image/*"
            onChange={handleGovernmentIdChange}
            className="mx-auto max-w-xs"
          />
          <span className="block text-center text-xs text-muted-foreground">
            Maximum file size: 2MB
          </span>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
