import * as Yup from "yup";

export const CreatePromotionSchema = Yup.object().shape({
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
  category: Yup.string().required("Event category is required"),
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
  category: Yup.string().required("Event category is required"),
  thumbnail: Yup.mixed().nullable().notRequired(),
});
