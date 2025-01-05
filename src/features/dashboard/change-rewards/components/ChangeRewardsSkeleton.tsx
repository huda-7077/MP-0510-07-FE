import { Skeleton } from "@/components/ui/skeleton";

const ChangeRewardsSkeleton = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <header className="border-b bg-background shadow-sm">
        <div className="flex h-16 items-center gap-4 px-6">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-px" />
          <Skeleton className="h-6 w-32" />
        </div>
      </header>

      <main className="flex-grow md:p-6">
        <div className="rounded-xl p-0 md:bg-muted/30 md:p-8 md:shadow-2xl dark:md:bg-muted/50">
          <div className="mt-4 w-screen space-y-4 px-3 md:mt-0 md:w-full md:px-0">
            <div className="space-y-4">
              <div className="grid auto-rows-min gap-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangeRewardsSkeleton;
