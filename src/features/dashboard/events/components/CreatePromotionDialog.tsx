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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { CreatePromotionSchema } from "./schemas";
import { useCreateVoucher } from "@/hooks/api/voucher/useCreateVoucher";
import useGetEvents from "@/hooks/api/event/useGetEvents";

const CreatePromotionDialog = () => {
  const [isCreatePromotionDialogOpen, setIsCreatePromotionDialogOpen] =
    useState(false);
  const { mutateAsync: createPromotion, isPending } = useCreateVoucher();

  const { data: eventsData, isLoading: isLoadingEvents } = useGetEvents({
    page: 1,
    take: 100,
    search: "",
    location: "",
  });

  const formik = useFormik({
    initialValues: {
      eventId: "",
      code: "",
      discountValue: 0,
      startDate: "",
      endDate: "",
    },
    validationSchema: CreatePromotionSchema,
    onSubmit: async (values) => {
      try {
        const formattedValues = {
          ...values,
          eventId: Number(values.eventId),
          discountValue: Number(values.discountValue),
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
        };
        await createPromotion(formattedValues);
        setIsCreatePromotionDialogOpen(false);
        formik.resetForm();
      } catch (error) {
        console.error("Error creating promotion:", error);
      }
    },
  });

  return (
    <>
      <Dialog
        open={isCreatePromotionDialogOpen}
        onOpenChange={setIsCreatePromotionDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            className="bg-green-500"
            variant={"outline"}
            onClick={() => setIsCreatePromotionDialogOpen(true)}
          >
            <Plus />
            <p>Promotion</p>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Promotion</DialogTitle>
            <DialogDescription>
              Create promotion for your event.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="eventId">Event</Label>
              <Select
                name="eventId"
                value={formik.values.eventId}
                onValueChange={(value) =>
                  formik.setFieldValue("eventId", value)
                }
                disabled={isLoadingEvents}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      isLoadingEvents ? "Loading events..." : "Select an event"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {!isLoadingEvents &&
                    eventsData?.data.map((event) => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        {event.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {!!formik.touched.eventId && !!formik.errors.eventId && (
                <div className="text-red-500">{formik.errors.eventId}</div>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="code">Code</Label>
              <Input
                type="text"
                name="code"
                placeholder="Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.code && !!formik.errors.code && (
                <div className="text-red-500">{formik.errors.code}</div>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="discountValue">Discount Percentage</Label>
              <Input
                type="number"
                name="discountValue"
                placeholder="Discount Percentage"
                value={formik.values.discountValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.discountValue &&
                !!formik.errors.discountValue && (
                  <div className="text-red-500">
                    {formik.errors.discountValue}
                  </div>
                )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                name="startDate"
                placeholder="Start Date"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.startDate && !!formik.errors.startDate && (
                <div className="text-red-500">{formik.errors.startDate}</div>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                name="endDate"
                placeholder="End Date"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.endDate && !!formik.errors.endDate && (
                <div className="text-red-500">{formik.errors.endDate}</div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsCreatePromotionDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Promotion"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePromotionDialog;
