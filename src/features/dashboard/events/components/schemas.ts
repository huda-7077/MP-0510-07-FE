import * as Yup from "yup";

export const CreateEventCategorySchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3),
  description: Yup.string().required("Description is required").min(3),
});

export const CreateEventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3),
  description: Yup.string().required("Description is required").min(3),
  full_description: Yup.string()
    .required("Full description is required")
    .min(3),
  price: Yup.string().required("Price is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  avaliableSeats: Yup.string().required("Avaliable seats is required"),
  location: Yup.string().required("Location is required"),
  eventCategory: Yup.string().required("Event category is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
});

export const EditEventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3),
  description: Yup.string().required("Description is required").min(3),
  full_description: Yup.string()
    .required("Full description is required")
    .min(3),
  price: Yup.string().required("Price is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  avaliableSeats: Yup.string().required("Avaliable seats is required"),
  location: Yup.string().required("Location is required"),
  eventCategory: Yup.string().required("Event category is required"),
  thumbnail: Yup.mixed().nullable().notRequired(),
});
