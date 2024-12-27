import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonSettings = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="mb-0 md:mb-2">
          <Label>User Roles</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-14 rounded-sm" />
        </div>
      </div>
      <Skeleton className="h-5 w-full rounded-md" />
    </div>
  );
};

export default SkeletonSettings;
