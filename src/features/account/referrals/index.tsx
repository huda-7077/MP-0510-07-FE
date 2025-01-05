"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseAsInteger, useQueryState } from "nuqs";
import PaginationSection from "@/components/PaginationSection";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import useGetReferredUsers from "@/hooks/api/account/useGetReferredUsers";
import { NEXT_PUBLIC_BASE_URL } from "@/config";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import useApplyReferralCode from "@/hooks/api/account/useApplyReferralCode";
import { ApplyReferralCodeSchema } from "../schemas";
import useGetReferredBy from "@/hooks/api/account/useGetReferredBy";

const ReferralProgramPage = () => {
  const { data: session } = useSession();
  const [referralCode, setReferralCode] = useState("");
  const { data: referredBy, isPending: referredByPending } = useGetReferredBy();

  const {
    mutateAsync: applyReferralCode,
    isPending: applyReferralCodePending,
  } = useApplyReferralCode();

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isPending } = useGetReferredUsers({ page });

  const formik = useFormik({
    initialValues: {
      referrerCode: "",
    },
    validationSchema: ApplyReferralCodeSchema,
    onSubmit: async (values) => {
      await applyReferralCode(values);
    },
  });

  useEffect(() => {
    if (session) {
      setReferralCode(
        `${NEXT_PUBLIC_BASE_URL}/register?ref=${session.user.referralCode}`,
      );
    }
  }, [session]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-4">
        <h1 className="mb-6 text-3xl font-bold">Referral Program</h1>
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Your Referral Code</h2>
            <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Input
                id="referralCode"
                value={referralCode}
                readOnly
                className="flex-grow"
              />
              <Button
                onClick={handleCopyReferralCode}
                className="w-full sm:w-auto"
              >
                Copy
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Apply Referral Code</h2>
            {!referredBy ? (
              <form onSubmit={formik.handleSubmit}>
                <p className="text-sm text-muted-foreground">
                  Enter the code of the user you want to refer and click
                  "Submit".
                </p>
                <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Input
                    id="referrerCode"
                    placeholder="Enter referrer code"
                    value={formik.values.referrerCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="flex-grow"
                  />
                  {formik.touched.referrerCode &&
                    formik.errors.referrerCode && (
                      <p className="text-xs text-red-500">
                        {formik.errors.referrerCode}
                      </p>
                    )}
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={applyReferralCodePending}
                  >
                    {applyReferralCodePending ? "Loading..." : "Submit"}
                  </Button>
                </div>
              </form>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                You can't apply a referral code because you have been referred
                by {referredBy?.referredBy.fullname}.
              </p>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">
              Users You've Referred
            </h2>
            {isPending && (
              <div className="flex h-[30vh] items-center justify-center">
                <h1 className="text-center">Loading...</h1>
              </div>
            )}

            {!data?.data.length && !isPending && (
              <div className="flex h-[30vh] items-center justify-center">
                <h1 className="text-center">No data</h1>
              </div>
            )}
            {!!data && !!data.data.length && (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date Referred</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.data.map((referral, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {index + data.meta.take * (page - 1) + 1}
                          </TableCell>
                          <TableCell>{referral.invitee.fullname}</TableCell>
                          <TableCell>
                            {format(referral.createdAt, "yyyy-MM-dd HH:mm:ss")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <PaginationSection
                    onChangePage={onChangePage}
                    page={page}
                    take={data.meta.take}
                    total={data.meta.total}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ReferralProgramPage;
