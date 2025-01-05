import { Skeleton } from "@/components/ui/skeleton";

const DashboardOrganizerPage = () => {
  return (
    <main className="flex-grow md:p-6">
      <div className="flex flex-1 flex-col gap-4 rounded-xl p-0 md:bg-muted/30 md:p-8 md:shadow-2xl dark:md:bg-muted/50">
        <div className="w-screen space-y-4 p-4 md:w-full md:p-0 md:px-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <Skeleton className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            anjayy
          </Skeleton>
        </div>
      </div>
    </main>
  );
};

export default DashboardOrganizerPage;
