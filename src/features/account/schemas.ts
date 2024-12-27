import * as Yup from "yup";

export const EditProfileSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required"),
  profilePicture: Yup.mixed().nullable().notRequired(),
});

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const ApplyOrganizerSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required").max(50),
  companyWebsite: Yup.string()
    .required("Company website is required")
    .max(50)
    .url("Invalid URL"),
  companyAddress: Yup.string().required("Company address is required").max(200),
  companyRole: Yup.string().required("Role in company is required").max(50),
  details: Yup.string().required("Company details are required").max(1000),
  governmentId: Yup.mixed().nullable().required("Government ID is required"),
});

export const ApplyReferralCodeSchema = Yup.object().shape({
  referrerCode: Yup.string().notRequired().min(8).max(8),
});
