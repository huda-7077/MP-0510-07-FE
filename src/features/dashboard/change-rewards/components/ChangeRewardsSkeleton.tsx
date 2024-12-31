// "use client";
import { Skeleton } from "@/components/ui/skeleton";

const ChangeRewardsSkeleton = () => {
  return (
    <div className="flex flex-col bg-gray-50 font-sans dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="mt-4 flex-1 rounded-md bg-white p-6 font-sans shadow dark:bg-gray-800">
        <div className="space-y-4">
          <div className="grid auto-rows-min gap-4">
            <Skeleton className="h-52 w-full" />
            <Skeleton className="h-52 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeRewardsSkeleton;
