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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Plus, Calendar, Percent, Tag, LayoutList } from "lucide-react";
import { CreatePromotionSchema } from "./schemas";
import { useCreateVoucher } from "@/hooks/api/voucher/useCreateVoucher";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useState } from "react";

const CreatePromotionDialog = () => {
  const [isCreatePromotionDialogOpen, setIsCreatePromotionDialogOpen] = useState(false);
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
        await createPromotion({
          ...values,
          eventId: Number(values.eventId),
          discountValue: Number(values.discountValue),
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
        });
        setIsCreatePromotionDialogOpen(false);
        formik.resetForm();
      } catch (error) {
        console.error("Error creating promotion:", error);
      }
    },
  });

  return (
    <Dialog open={isCreatePromotionDialogOpen} onOpenChange={setIsCreatePromotionDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" />
          New Promotion
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Promotion</DialogTitle>
          <DialogDescription>Add a new promotional discount for your event</DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Event Selection */}
          <div className="space-y-2">
            <Label htmlFor="eventId">Select Event</Label>
            <div className="relative">
              <LayoutList className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Select
                name="eventId"
                value={formik.values.eventId}
                onValueChange={(value) => formik.setFieldValue("eventId", value)}
                disabled={isLoadingEvents}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder={isLoadingEvents ? "Loading..." : "Select event"} />
                </SelectTrigger>
                <SelectContent>
                  {!isLoadingEvents && eventsData?.data.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formik.touched.eventId && formik.errors.eventId && (
              <p className="text-sm text-red-500">{formik.errors.eventId}</p>
            )}
          </div>

          {/* Promotion Code */}
          <div className="space-y-2">
            <Label htmlFor="code">Promotion Code</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                name="code"
                placeholder="Enter promo code"
                className="pl-10"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.code && formik.errors.code && (
              <p className="text-sm text-red-500">{formik.errors.code}</p>
            )}
          </div>

          {/* Discount Value */}
          <div className="space-y-2">
            <Label htmlFor="discountValue">Discount Percentage</Label>
            <div className="relative">
              <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="number"
                name="discountValue"
                placeholder="Enter discount percentage"
                className="pl-10"
                value={formik.values.discountValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.discountValue && formik.errors.discountValue && (
              <p className="text-sm text-red-500">{formik.errors.discountValue}</p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  name="startDate"
                  className="pl-10"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.startDate && formik.errors.startDate && (
                <p className="text-sm text-red-500">{formik.errors.startDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  name="endDate"
                  className="pl-10"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.endDate && formik.errors.endDate && (
                <p className="text-sm text-red-500">{formik.errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreatePromotionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isPending}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isPending ? "Creating..." : "Create Promotion"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromotionDialog;