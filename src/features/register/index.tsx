"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import { RegisterSchema } from "./schemas";
import Link from "next/link";

const RegisterPage = () => {
  const { mutateAsync: register, isPending } = useRegister();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      referralCode: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <main className="flex justify-center pt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  name="fullname"
                  type="text"
                  placeholder="Name"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.fullname && !!formik.errors.fullname ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.fullname}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.email && !!formik.errors.email ? (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.password && !!formik.errors.password ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                <Input
                  name="referralCode"
                  type="text"
                  placeholder="Referral Code"
                  value={formik.values.referralCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.referralCode &&
                !!formik.errors.referralCode ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.referralCode}
                  </p>
                ) : null}
              </div>
            </div>
            <Button
              type="submit"
              className="mt-4 w-full bg-[#80AE44] text-black hover:bg-[#9AC265]"
              disabled={isPending}
            >
              {isPending ? "loading..." : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have account ?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPage;
