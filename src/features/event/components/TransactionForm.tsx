"use client";
import React, { useState, FC, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Gift, Ticket } from "lucide-react";
import useCreateTransaction from "@/hooks/api/transaction/useCreateTransaction";

interface Event {
  id: number;
  title: string;
}

interface TransactionFormProps {
  event?: Event;
  defaultEventId?: number;
  onClose: () => void;
}

export const TransactionForm: FC<TransactionFormProps> = ({
  event,
  defaultEventId = 0,
  onClose,
}) => {
  const { mutate: createTransaction, isPending } = useCreateTransaction();
  const [eventId, setEventId] = useState(event?.id ?? defaultEventId);
  const [quantity, setQuantity] = useState(1);
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      eventId,
      quantity,
      pointsUsed: pointsUsed > 0 ? pointsUsed : undefined,
      voucherCode: voucherCode || undefined,
      couponCode: couponCode || undefined,
    });
    createTransaction({
      eventId,
      quantity,
      pointsUsed: pointsUsed > 0 ? pointsUsed : undefined,
      voucherCode: voucherCode || undefined,
      couponCode: couponCode || undefined,
      paymentProof: undefined,
    });
  };
  
  

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-xl bg-white p-0 text-black sm:max-w-[600px]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-center text-3xl font-serif font-bold">
            <div>StarTicket</div>
            {event ? `Get Tickets for ${event.title}` : "Create Transaction"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6 p-6">
          <div className="space-y-4">
            {!event && (
              <div className="space-y-2">
                <Label htmlFor="eventId">Event ID</Label>
                <Input
                  id="eventId"
                  type="number"
                  value={eventId}
                  onChange={(e) => setEventId(Number(e.target.value))}
                  className="w-full border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:border-black focus:ring-black"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:border-black focus:ring-black"
              />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 rounded-lg bg-gray-100 p-4"
          >
            <div className="space-y-2">
              <Label htmlFor="pointsUsed" className="flex items-center">
                <Gift className="mr-2 h-4 w-4" />
                Points Used (optional)
              </Label>
              <Input
                id="pointsUsed"
                type="number"
                placeholder="0"
                value={pointsUsed}
                onChange={(e) => setPointsUsed(Number(e.target.value))}
                className="w-full border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:border-black focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voucherCode" className="flex items-center">
                <Ticket className="mr-2 h-4 w-4" />
                Voucher Code (optional)
              </Label>
              <Input
                id="voucherCode"
                type="text"
                placeholder="ABC123"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="w-full border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:border-black focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="couponCode" className="flex items-center">
                <Gift className="mr-2 h-4 w-4" />
                Coupon Code (optional)
              </Label>
              <Input
                id="couponCode"
                type="text"
                placeholder="XYZ999"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:border-black focus:ring-black"
              />
            </div>
          </motion.div>
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="border-black text-black hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-black text-white hover:bg-gray-800"
            >
              {isPending ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </motion.div>
              ) : (
                "Order Tickets"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
