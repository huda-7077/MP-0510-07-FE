"use client";
import Navbar from "@/components/Navbar";
import RichTextEditor from "@/components/RichTextEditor";
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
import { Textarea } from "@/components/ui/textarea";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { categories } from "@/utils/categories";
import { cities } from "@/utils/cities";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const CreateEventPage = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

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
    onSubmit: async (values) => {
      await createEvent(values);
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
      <section className="container mx-auto pt-2">
        <Navbar />
      </section>
      <main className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-4 pt-5 text-4xl font-semibold">Create Event</h1>
        <form className="mt-10 space-y-5" onSubmit={formik.handleSubmit}>
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
            {!!formik.touched.title && !!formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Select
              name=""
              value={formik.values.category}
              onValueChange={(value) => formik.setFieldValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!!formik.touched.category && !!formik.errors.category && (
              <div className="text-sm text-red-500">
                {formik.errors.category}
              </div>
            )}
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
            {!!formik.touched.description && !!formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>

          <RichTextEditor
            label="About Event"
            value={formik.values.full_description}
            onChange={(value: string) =>
              formik.setFieldValue("full_description", value)
            }
            isError={!!formik.errors.full_description}
          />

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              name="price"
              placeholder="Price "
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
            {!!formik.touched.price && !!formik.errors.price && (
              <div className="text-sm text-red-500">
                {formik.errors.price}
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
              !!formik.errors.avaliableSeats && (
                <div className="text-red-500">
                  {formik.errors.avaliableSeats}
                </div>
              )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Select
              name="location"
              value={formik.values.location}
              onValueChange={(value) => formik.setFieldValue("location", value)}
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
            {!!formik.touched.location && !!formik.errors.location && (
              <div className="text-sm text-red-500">
                {formik.errors.location}
              </div>
            )}
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
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="my-10" disabled={isPending}>
              {isPending ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateEventPage;
