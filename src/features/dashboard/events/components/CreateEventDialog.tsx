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
import { Textarea } from "@/components/ui/textarea";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { categories } from "@/utils/categories";
import { cities } from "@/utils/cities";
import { useFormik } from "formik";
import { Plus, Image as ImageIcon, Calendar, MapPin, Users, CreditCard } from "lucide-react";
import { CreateEventSchema } from "./schemas";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const CreateEventDialog = () => {
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const { mutateAsync: createEvent, isPending } = useCreateEvent();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

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
      category: "",
      thumbnail: null,
    },
    validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      await createEvent(values);
      setIsCreateEventDialogOpen(false);
      formik.resetForm();
    },
  });

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <Dialog open={isCreateEventDialogOpen} onOpenChange={setIsCreateEventDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Event</DialogTitle>
          <DialogDescription>Fill in the event details below</DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-8 overflow-y-auto px-1">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    name="title"
                    placeholder="Enter event title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.title && formik.touched.title ? "border-red-500" : ""}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-1 text-xs text-red-500">{formik.errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    name="category"
                    value={formik.values.category}
                    onValueChange={(value) => formik.setFieldValue("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="mt-1 text-xs text-red-500">{formik.errors.category}</p>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Description</h3>
                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Brief event description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className="h-24 resize-none"
                  />
                </div>
                <RichTextEditor
                  label="Full Description"
                  value={formik.values.full_description}
                  onChange={(value) => formik.setFieldValue("full_description", value)}
                  onBlur={() => formik.setFieldTouched("full_description", true)}
                  error={formik.errors.full_description}
                  touched={formik.touched.full_description}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Event Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event Details</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        type="datetime-local"
                        name="startDate"
                        className="pl-10"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        type="datetime-local"
                        name="endDate"
                        className="pl-10"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Select
                      name="location"
                      value={formik.values.location}
                      onValueChange={(value) => formik.setFieldValue("location", value)}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="price">Ticket Price</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        type="number"
                        name="price"
                        className="pl-10"
                        placeholder="0"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="avaliableSeats">Available Seats</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        type="number"
                        name="avaliableSeats"
                        className="pl-10"
                        placeholder="0"
                        value={formik.values.avaliableSeats}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event Image</h3>
                <div className="rounded-lg border-2 border-dashed p-4">
                  {selectedImage ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={selectedImage}
                        alt="Event thumbnail"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => {
                          setSelectedImage("");
                          formik.setFieldValue("thumbnail", null);
                          if (thumbnailRef.current) thumbnailRef.current.value = "";
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                      <Label
                        htmlFor="thumbnail"
                        className="cursor-pointer text-sm text-gray-600 hover:text-emerald-600"
                      >
                        Click to upload image
                      </Label>
                      <Input
                        id="thumbnail"
                        ref={thumbnailRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onChangeThumbnail}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateEventDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isPending || !formik.isValid}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isPending ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
