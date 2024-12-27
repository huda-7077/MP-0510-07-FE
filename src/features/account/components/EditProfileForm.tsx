"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditProfileSchema } from "../schemas";
import useUpdateProfile from "@/hooks/api/account/useUpdateProfile";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import SkeletonProfile from "./SkeletonProfile";
import { useSession } from "next-auth/react";

const EditProfileForm = () => {
  const { data: session, update: updateSession } = useSession();
  const token = session?.user.token;
  const { data, isPending: isPendingGet } = useGetProfile({ token });
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile(token!);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const profilePictureRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      profilePicture: null,
    },
    validationSchema: EditProfileSchema,
    onSubmit: async (values) => {
      await updateProfile(values);
      await updateSession(values);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        fullname: data.fullname,
        profilePicture: null,
      });
      setSelectedImage(data.profilePicture || "");
    }
  }, [data]);

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      formik.setFieldValue("profilePicture", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveProfilePicture = () => {
    formik.setFieldValue("profilePicture", null);
    setSelectedImage("");
    if (profilePictureRef.current) {
      profilePictureRef.current.value = "";
    }
  };

  if (isPendingGet) return <SkeletonProfile />;

  return (
    <form className="mt-4 space-y-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="profilePicture" className="text-base">
          Profile Picture
        </Label>
        <div className="mt-2 flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Avatar className="h-28 w-28 cursor-pointer md:h-36 md:w-36">
                <AvatarImage src={selectedImage || ""} alt="Profile picture" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="mx-auto max-w-md space-y-1.5 rounded-lg p-4 shadow-md">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Profile Picture
                </DialogTitle>
                <DialogDescription className="text-center">
                  Change or remove your profile picture here.
                  <br />
                  (Size must be less than 1MB)
                </DialogDescription>
              </DialogHeader>
              {selectedImage && (
                <div>
                  <div className="relative mx-auto aspect-square w-full">
                    <Image
                      src={selectedImage}
                      alt="Profile Preview"
                      fill
                      priority
                      sizes="70%"
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleRemoveProfilePicture}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
              <Input
                ref={profilePictureRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="mx-auto max-w-xs"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="fullname" className="text-base">
          Full Name
        </Label>
        <Input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Full Name"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fullname && formik.errors.fullname && (
          <p className="text-xs text-red-500">{formik.errors.fullname}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="md:my-3" disabled={isPending}>
          {isPending ? "Loading..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
