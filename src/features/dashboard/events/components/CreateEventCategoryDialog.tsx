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
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateEventCategory from "@/hooks/api/event-categories/useCreateEventCategory";
import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { CreateEventCategorySchema } from "./schemas";

const CreateEventCategoryDialog = () => {
  const [isCreateEventCategoryDialogOpen, setIsCreateEventCategoryDialogOpen] =
    useState(false);
  const { mutateAsync: createEventCategory, isPending } =
    useCreateEventCategory();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: CreateEventCategorySchema,
    onSubmit: async (values) => {
      await createEventCategory(values);
      setIsCreateEventCategoryDialogOpen(false);
      formik.resetForm();
    },
  });

  return (
    <>
      <Dialog
        open={isCreateEventCategoryDialogOpen}
        onOpenChange={setIsCreateEventCategoryDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            className="bg-green-500"
            variant={"outline"}
            onClick={() => setIsCreateEventCategoryDialogOpen(true)}
          >
            <Plus />
            Event Categories
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event Category</DialogTitle>
            <DialogDescription>
              Create event category by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                {!!formik.touched.title && !!formik.errors.title ? (
                  <p className="text-xs text-red-500">{formik.errors.title}</p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  placeholder="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {!!formik.touched.description && !!formik.errors.description ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.description}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateEventCategoryDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending || !formik.isValid}>
                  {isPending ? "Creating..." : "Create"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateEventCategoryDialog;
