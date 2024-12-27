import RegisterPage from "@/features/register";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Register = async () => {
  const session = await auth();
  if (session) return redirect("/login");
  return <RegisterPage />;
};

export default Register;
