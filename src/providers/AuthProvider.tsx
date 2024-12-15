"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { PropsWithChildren, useEffect, useState } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("blog-storage");

    if (data) {
      dispatch(loginAction(JSON.parse(data)));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
