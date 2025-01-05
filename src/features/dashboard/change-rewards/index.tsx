"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useCreateRewards from "@/hooks/api/rewards/useCreateRewards";
import useGetRewards from "@/hooks/api/rewards/useGetRewards";
import useUpdateRewards from "@/hooks/api/rewards/useUpdateRewards";
import Link from "next/link";
import { useEffect, useState } from "react";
import ChangeRewardsSkeleton from "./components/ChangeRewardsSkeleton";

const ChangeRewardsPage = () => {
  const [rewardsData, setRewardsData] = useState({
    pointsValue: 0,
    couponsValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const { data: rewards, isLoading: rewardsLoading } = useGetRewards();
  const createRewards = useCreateRewards();
  const updateRewards = useUpdateRewards();

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
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <header className="border-b bg-background shadow-sm">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium text-primary">
                  Change Rewards
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="flex-grow md:p-6">
        <div className="rounded-xl p-0 md:bg-muted/30 md:p-8 md:shadow-2xl dark:md:bg-muted/50">
          <div className="mt-4 w-screen space-y-4 px-3 md:mt-0 md:w-full md:px-0">
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
                <Button className="w-full" onClick={handleCreateRewards}>
                  Create Rewards
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangeRewardsPage;
