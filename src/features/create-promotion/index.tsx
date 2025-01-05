"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useCreateVoucher } from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreatePromotionPage = () => {
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
    validationSchema: Yup.object({
      eventId: Yup.string().required("Event is required"),
      code: Yup.string()
        .required("Code is required")
        .min(4, "Code must be at least 4 characters"),
      discountValue: Yup.number()
        .required("Discount value is required")
        .min(0, "Discount cannot be negative")
        .max(100, "Discount cannot exceed 100%"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date must be after start date"),
    }),
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
      } catch (error) {
        console.error("Error creating promotion:", error);
      }
    },
  });

  return (
    <>
      <section className="container mx-auto pt-2">
        <Navbar />
      </section>
      <main className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-4 pt-5 text-4xl font-semibold">Create Promotion</h1>
        <form className="mt-10 space-y-5" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="eventId">Event</Label>
            <Select
              name="eventId"
              value={formik.values.eventId}
              onValueChange={(value) => formik.setFieldValue("eventId", value)}
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

          <div className="flex justify-end">
            <Button type="submit" className="my-10" disabled={isPending}>
              {isPending ? "Creating..." : "Create Promotion"}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreatePromotionPage;
