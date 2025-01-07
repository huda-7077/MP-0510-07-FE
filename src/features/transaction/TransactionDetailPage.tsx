"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetTransaction from "@/hooks/api/transaction/useGetTransaction";
import useUploadPaymentProof from "@/hooks/api/transaction/useUploadPaymentProof";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface TransactionDetailPageProps {
  transactionId: number;
}

const TransactionDetailPage: FC<TransactionDetailPageProps> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const [paymentMethod, setPaymentMethod] = useState<"BRIMO" | "GOPAY">(
    "BRIMO",
  );
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const paymentMethods = [
    { value: "BRIMO", label: "BRI Mobile" },
    { value: "GOPAY", label: "Gopay" },
  ];

  const transactionId = Number(id) || 0;

  const { data, isLoading, isError, error } = useGetTransaction(transactionId);
  const uploadMutation = useUploadPaymentProof();

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Failed to fetch transaction details");
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex h-screen items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-black"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!data) {
    return <div>Transaction not found</div>;
  }

  const renderTransferInstructions = () => {
    if (paymentMethod === "BRIMO") {
      return (
        <div className="space-y-4">
          <p>
            Please transfer{" "}
            <span className="font-bold text-black">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(data.totalPrice))}
            </span>{" "}
            to the following account:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Bank:</strong> BRI
            </li>
            <li>
              <strong>Account Number:</strong> 6809 0102 9869 536
            </li>
            <li>
              <strong>Account Name:</strong> Muhammad Syaiful Mu'min
            </li>
          </ul>
          <p>
            After transferring, you can upload the transfer proof using the form
            below.
          </p>
        </div>
      );
    } else if (paymentMethod === "GOPAY") {
      return (
        <div className="space-y-4">
          <p>
            Please transfer{" "}
            <span className="font-bold text-black">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(data.totalPrice))}
            </span>{" "}
            via Gopay to the following number:
          </p>
          <ul className="list-inside list-disc">
            <li>
              <strong>Gopay Number:</strong> 082178342897
            </li>
          </ul>
          <p>
            After transferring, you can upload the transfer proof using the form
            below.
          </p>
        </div>
      );
    }
    return null;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only JPEG and PNG files are allowed.");
      return;
    }

    if (selectedFile.size > maxSize) {
      toast.error("File size exceeds the maximum limit of 5MB.");
      return;
    }

    uploadMutation.mutate(
      {
        transactionId: transactionId,
        paymentProof: selectedFile,
      },
      {
        onSuccess: () => {
          setSelectedFile(null);
          queryClient.invalidateQueries({
            queryKey: ["transactions", transactionId],
          });
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
        <Card className="overflow-hidden rounded-3xl border-0 shadow-md">
          <CardHeader className="border-b bg-green-600 p-6">
            <CardTitle className="text-2xl font-bold text-white">
              Transaction Detail
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6 p-6 md:grid-cols-2">
            <div className="col-span-2">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="ml-2 text-sm font-medium text-emerald-700">
                  {data.status}
                </span>
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "Customer", value: data.user.fullname },
                { label: "Event", value: data.event.title },
                { label: "Quantity", value: data.quantity },
                {
                  label: "Total Price",
                  value: new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(Number(data.totalPrice)),
                },
                {
                  label: "Expires At",
                  value: data.expiresAt
                    ? new Date(data.expiresAt).toLocaleString("id-ID")
                    : "-",
                },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">
                Payment Proof
              </h3>
              {data.paymentProof ? (
                <img
                  src={data.paymentProof}
                  alt="Payment Proof"
                  className="w-full rounded-2xl object-cover shadow-sm transition hover:opacity-90"
                />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-2xl bg-gray-50">
                  <p className="text-sm text-gray-400">No payment proof yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border-0 bg-white shadow-md">
            <CardHeader className="border-b p-6">
              <CardTitle className="text-lg font-semibold">
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative">
                <Button
                  type="button"
                  className="group relative w-full rounded-2xl border px-4 py-3 text-left shadow-sm transition-all hover:border-black hover:ring-2 hover:ring-gray-100"
                  onClick={() =>
                    setIsPaymentDropdownOpen(!isPaymentDropdownOpen)
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {
                        paymentMethods.find((p) => p.value === paymentMethod)
                          ?.label
                      }
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${isPaymentDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </Button>

                <AnimatePresence>
                  {isPaymentDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-lg"
                    >
                      {paymentMethods.map((method) => (
                        <Button
                          key={method.value}
                          type="button"
                          variant="ghost"
                          className={`w-full justify-start p-4 text-left transition-colors hover:bg-gray-50 ${paymentMethod === method.value ? "bg-gray-50 font-medium" : ""}`}
                          onClick={() => {
                            setPaymentMethod(method.value as "BRIMO" | "GOPAY");
                            setIsPaymentDropdownOpen(false);
                          }}
                        >
                          {method.label}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md">
            <CardHeader className="border-b p-6">
              <CardTitle className="text-lg font-semibold">
                Payment Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none">
                {renderTransferInstructions()}
              </div>
            </CardContent>
          </Card>
        </div>

        {String(data.status) === "WAITING_FOR_PAYMENT" && (
          <Card className="rounded-3xl border-0 bg-white shadow-md">
            <CardHeader className="border-b p-6">
              <CardTitle className="text-lg font-semibold">
                Upload Payment Proof
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-gray-500">
                JPEG or PNG format (max 5MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="group relative cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center transition-all hover:border-gray-300 hover:bg-gray-50">
                  <input
                    type="file"
                    id="paymentProof"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="paymentProof" className="space-y-2">
                    <div className="text-sm text-gray-600">
                      {selectedFile ? (
                        <span className="font-medium">{selectedFile.name}</span>
                      ) : (
                        <>Click to upload or drag and drop</>
                      )}
                    </div>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={uploadMutation.isPending}
                  className="w-full rounded-2xl bg-green-600 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {uploadMutation.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-white" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Upload Proof"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TransactionDetailPage;
