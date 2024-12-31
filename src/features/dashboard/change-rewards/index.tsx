"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetRewards from "@/hooks/api/rewards/useGetRewards";
import useCreateRewards from "@/hooks/api/rewards/useCreateRewards";
import useUpdateRewards from "@/hooks/api/rewards/useUpdateRewards";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangeRewardsSkeleton from "./components/ChangeRewardsSkeleton";

const ChangeRewardsPage = () => {
  const { data: session } = useSession();
  const token = session?.user.token;

  const [rewardsData, setRewardsData] = useState({
    pointsValue: 0,
    couponsValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const { data: rewards, isLoading: rewardsLoading } = useGetRewards({ token });
  const createRewards = useCreateRewards(token!);
  const updateRewards = useUpdateRewards(token!);

  useEffect(() => {
    if (!rewardsLoading && rewards) {
      setRewardsData({
        pointsValue: rewards.pointsValue || 0,
        couponsValue: rewards.couponsValue || 0,
      });
      setIsLoading(false);
    } else if (!rewardsLoading && !rewards) {
      setIsLoading(false);
    }
  }, [rewards, rewardsLoading]);

  const handleCreateRewards = () => {
    createRewards.mutate({
      pointsValue: 10000,
      couponsValue: 10000,
    });
  };

  const handleUpdateRewards = () => {
    updateRewards.mutate({
      pointsValue: rewardsData.pointsValue,
      couponsValue: rewardsData.couponsValue,
    });
  };

  if (isLoading) {
    return <ChangeRewardsSkeleton />;
  }

  return (
    <div className="flex flex-col bg-gray-50 font-sans dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Change Rewards
          </h1>
        </div>
      </div>
      <div className="mt-4 flex-1 rounded-md bg-white p-6 font-sans shadow dark:bg-gray-800">
        <div className="space-y-4">
          {rewards && (
            <div className="grid auto-rows-min gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl">Points Value</CardTitle>
                  <CardDescription>
                    Showing current point value for rewarding inviters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Input
                      id="pointsValue"
                      type="number"
                      value={rewardsData.pointsValue}
                      className="h-20 text-end font-bold"
                      style={{ fontSize: "2.25rem", lineHeight: "2.5rem" }}
                      onChange={(e) =>
                        setRewardsData({
                          ...rewardsData,
                          pointsValue: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl">Coupons Value</CardTitle>
                  <CardDescription>
                    Showing current coupon value for rewarding invited users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Input
                      id="couponsValue"
                      type="number"
                      value={rewardsData.couponsValue}
                      className="h-20 text-end font-bold"
                      style={{ fontSize: "2.25rem", lineHeight: "2.5rem" }}
                      onChange={(e) =>
                        setRewardsData({
                          ...rewardsData,
                          couponsValue: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleUpdateRewards}>Update Rewards</Button>
            </div>
          )}
          {!rewards && (
            <Button onClick={handleCreateRewards}>Create Rewards</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeRewardsPage;
