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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import useGetEventCategories from "@/hooks/api/event-categories/useGetEventCategories";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { cities } from "@/utils/cities";
import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { CreateEventSchema } from "./schemas";

import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const CreateEventDialog = () => {
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const { mutateAsync: createEvent, isPending } = useCreateEvent();
  const { data: eventCategories, isLoading } = useGetEventCategories({});

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      full_description: "",
      price: "",
      startDate: "",
      endDate: "",
      avaliableSeats: "",
      location: "",
      eventCategory: "",
      thumbnail: null,
    },
    validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      await createEvent(values);
      setIsCreateEventDialogOpen(false);
      formik.resetForm();
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    setSelectedImage("");
    formik.setFieldValue("thumbnail", null);
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <>
      <Dialog
        open={isCreateEventDialogOpen}
        onOpenChange={setIsCreateEventDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            className="bg-green-500"
            variant={"outline"}
            onClick={() => setIsCreateEventDialogOpen(true)}
          >
            <Plus />
            <p className="hidden md:block">Event</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-screen-md">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Create a new event by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <form
            className="max-h-[60vh] space-y-4 overflow-y-auto p-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.title && !!formik.errors.title ? (
                <div className="text-xs text-red-500">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="eventCategory">Category</Label>
              <Select
                name="eventCategory"
                value={formik.values.eventCategory}
                onValueChange={(value) =>
                  formik.setFieldValue("eventCategory", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories && eventCategories.data
                    ? eventCategories.data.map((category) => (
                        <SelectItem key={category.id} value={category.title}>
                          {category.title}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
              {!!formik.touched.eventCategory &&
              !!formik.errors.eventCategory ? (
                <div className="text-xs text-red-500">
                  {formik.errors.eventCategory}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
                className="resize-none"
              />
              {!!formik.touched.description && !!formik.errors.description ? (
                <div className="text-xs text-red-500">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <RichTextEditor
              label="Full Description"
              value={formik.values.full_description}
              onChange={(value) =>
                formik.setFieldValue("full_description", value)
              }
              onBlur={() => formik.setFieldTouched("full_description", true)}
              error={formik.errors.full_description}
              touched={formik.touched.full_description}
            />

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={formik.values.price}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    formik.setFieldValue("price", value);
                  }
                }}
                onBlur={formik.handleBlur}
                min={0}
              />
              {!!formik.touched.price && !!formik.errors.price ? (
                <div className="text-xs text-red-500">
                  {formik.errors.price}
                </div>
              ) : null}
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
              {!!formik.touched.startDate && !!formik.errors.startDate ? (
                <div className="text-xs text-red-500">
                  {formik.errors.startDate}
                </div>
              ) : null}
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
              {!!formik.touched.endDate && !!formik.errors.endDate ? (
                <div className="text-xs text-red-500">
                  {formik.errors.endDate}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="avaliableSeats">Avaliable Seats</Label>
              <Input
                type="number"
                name="avaliableSeats"
                placeholder="Avaliable Seats"
                value={formik.values.avaliableSeats}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    formik.setFieldValue("avaliableSeats", value);
                  }
                }}
                onBlur={formik.handleBlur}
                min={0}
              />
              {!!formik.touched.avaliableSeats &&
              !!formik.errors.avaliableSeats ? (
                <div className="text-xs text-red-500">
                  {formik.errors.avaliableSeats}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Select
                name="location"
                value={formik.values.location}
                onValueChange={(value) =>
                  formik.setFieldValue("location", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!!formik.touched.location && !!formik.errors.location ? (
                <div className="text-xs text-red-500">
                  {formik.errors.location}
                </div>
              ) : null}
            </div>

            {selectedImage && (
              <>
                <div className="relative h-[200px] w-[300px]">
                  <Image
                    src={selectedImage}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={removeThumbnail}
                >
                  Remove
                </Button>
              </>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label>Thumbnail</Label>
              <Input
                ref={thumbnailRef}
                type="file"
                accept="image/*"
                onChange={onChangeThumbnail}
              />
              {!!formik.touched.thumbnail && !!formik.errors.thumbnail ? (
                <p className="text-xs text-red-500">
                  {formik.errors.thumbnail}
                </p>
              ) : null}
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsCreateEventDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !formik.isValid}>
                {isPending ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateEventDialog;
