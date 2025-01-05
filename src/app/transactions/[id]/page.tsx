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
import { Label } from "@/components/ui/label";
import useGetTransaction from "@/hooks/api/transaction/useGetTransaction";
import useUploadPaymentProof from "@/hooks/api/transaction/useUploadPaymentProof";
import { TransactionStatus } from "@/types/transaction";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const TransactionDetail: React.FC = () => {
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
    const maxSize = 5 * 1024 * 1024; // 5MB

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
    <>
      <section className="container mx-auto pt-2">
        <Navbar />
      </section>
      <div className="container mx-auto max-w-4xl space-y-6 px-4 py-8 text-black">
        <Card className="rounded-lg border border-gray-200 bg-white shadow-xl">
          <CardHeader className="rounded-t-lg bg-gray-100 p-4">
            <CardTitle className="text-2xl font-semibold text-black">
              Transaction Detail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <p>
              <strong>Name:</strong> {data.user.fullname}
            </p>
            <p>
              <strong>Order Event:</strong> {data.event.title}
            </p>
            <p>
              <strong>Quantity:</strong> {data.quantity}
            </p>
            <p>
              <strong>Total Price:</strong>{" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(data.totalPrice))}
            </p>
            <p>
              <strong>Status:</strong> {data.status}
            </p>
            <p>
              <strong>Expires At:</strong>{" "}
              {data.expiresAt
                ? new Date(data.expiresAt).toLocaleString("id-ID")
                : ""}
            </p>
            {data.paymentProof && (
              <div className="mt-4">
                <strong>Payment Proof:</strong>
                <div className="mt-2">
                  <img
                    src={data.paymentProof}
                    alt="Payment Proof"
                    className="max-w-xs rounded shadow-md"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-200 bg-white shadow-lg">
          <CardHeader className="rounded-t-lg bg-gray-100 p-4">
            <CardTitle className="text-xl font-medium text-black">
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Label htmlFor="paymentMethod">Select Payment Method</Label>
              <div className="relative">
                <Button
                  type="button"
                  className="w-full rounded-md border border-gray-400 px-4 py-2 transition-colors"
                  onClick={() =>
                    setIsPaymentDropdownOpen(!isPaymentDropdownOpen)
                  }
                >
                  <span>
                    {
                      paymentMethods.find((p) => p.value === paymentMethod)
                        ?.label
                    }
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isPaymentDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                <AnimatePresence>
                  {isPaymentDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-1 w-full overflow-hidden rounded-md bg-white shadow-lg"
                    >
                      {paymentMethods.map((method) => (
                        <Button
                          key={method.value}
                          type="button"
                          variant="ghost"
                          className={`w-full justify-start ${paymentMethod === method.value ? "bg-gray-200" : ""}`}
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
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-200 bg-white shadow-lg">
          <CardHeader className="rounded-t-lg bg-gray-100 p-4">
            <CardTitle>
              {paymentMethod === "BRIMO"
                ? "BRIMO Transfer Instructions"
                : "Gopay Transfer Instructions"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {renderTransferInstructions()}
          </CardContent>
        </Card>

        {data.status ===
          (TransactionStatus.WAITING_FOR_PAYMENT as unknown as number) && (
          <Card className="rounded-lg border border-gray-200 bg-white shadow-lg">
            <CardHeader className="rounded-t-lg bg-gray-100 p-4">
              <CardTitle>Upload Payment Proof</CardTitle>
              <CardDescription>
                Please upload your payment proof in JPEG or PNG format (max 5MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <Label htmlFor="paymentProof">Choose File</Label>
                  <input
                    type="file"
                    id="paymentProof"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-gray-100"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={uploadMutation.isPending}
                  className="w-full rounded-md border border-gray-400 px-4 py-2 transition-colors"
                >
                  {uploadMutation.isPending ? "Uploading..." : "Upload Proof"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TransactionDetail;
