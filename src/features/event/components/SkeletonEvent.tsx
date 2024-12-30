import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonEvent = () => {
  return (
    <>
      <section className="container mx-auto pt-2">
        <Navbar />
      </section>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-wrap justify-between gap-6">
          <div className="relative h-[500px] w-full overflow-hidden rounded-lg md:w-[700px]">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
          <Skeleton className="w-[500px] rounded-lg" />
        </div>

        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
    </>
  );
};

export default SkeletonEvent;
