"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import { RegisterSchema } from "./schemas";
import Link from "next/link";
import Image from "next/image";
import { useQueryState } from "nuqs";

const RegisterPage = () => {
  const [search] = useQueryState("ref", { defaultValue: "" });
  const { mutateAsync: register, isPending } = useRegister();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      referralCode: search,
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...rest } = values;
      await register(rest);
    },
  });

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create an Account</h1>
                    <p className="text-balance text-muted-foreground">
                      Register for your Suket account
                    </p>
                  </div>
                  <div className="grid gap-2">
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
                  <div className="grid gap-2">
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
                      <p className="text-xs text-red-500">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="grid gap-2">
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
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {!!formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword ? (
                      <p className="text-xs text-red-500">
                        {formik.errors.confirmPassword}
                      </p>
                    ) : null}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="referralCode">
                      Referral Code (Optional)
                    </Label>
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

                  <Button
                    type="submit"
                    className="mt-4 w-full bg-[#80AE44] text-black hover:bg-[#9AC265]"
                    disabled={isPending}
                  >
                    {isPending ? "loading..." : "Register"}
                  </Button>
                  <div className="text-center text-sm">
                    Already have account?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4 hover:text-blue-500"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
              <div className="relative hidden bg-muted md:block">
                <Image
                  src="/ticket2.avif"
                  alt="Image"
                  fill
                  sizes=" ( min-width: 768px ) 50vw, 100vw"
                  priority
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking Register, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
