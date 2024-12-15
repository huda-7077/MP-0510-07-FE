import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1)
    .minNumbers(1)
    .minUppercase(1)
    .min(6),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Your passwords do not match"),
});
