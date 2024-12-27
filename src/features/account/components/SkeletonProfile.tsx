import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProfile = () => {
  return (
    <div className="mt-4 space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-base">Profile Picture</h1>
        <div className="mt-2 flex items-center space-x-4">
          <Skeleton className="h-28 w-28 rounded-full md:h-36 md:w-36" />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-base">Full Name</h1>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default SkeletonProfile;
