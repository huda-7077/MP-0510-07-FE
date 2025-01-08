"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import useGetProfile from "@/hooks/api/account/useGetProfile";

const RewardCard = ({
  label,
  content,
}: {
  label: string;
  content: React.ReactNode;
}) => (
  <Card>
    <CardHeader>
      <Label htmlFor="reward-content" className="text-base">
        {label}
      </Label>
    </CardHeader>
    <CardContent className="flex flex-col">
      <div
        id="reward-content"
        className="ml-2 text-2xl font-semibold md:text-5xl"
      >
        {content}
      </div>
    </CardContent>
  </Card>
);

const CardRewards = () => {
  const { data, isPending: isPendingGet } = useGetProfile();

  if (isPendingGet) {
    return (
      <div className="grid grid-rows-2 gap-4">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-rows-2 gap-4">
      <RewardCard
        label="Total Points Earned"
        content={data?.totalPoints || 0}
      />
      <RewardCard
        label="Your Coupon Code"
        content={
          <span
            className={`${
              data?.coupon?.isUsed ? "text-gray-400 line-through" : ""
            }`}
          >
            {data?.coupon?.code || "-"}
          </span>
        }
      />
    </div>
  );
};

export default CardRewards;
