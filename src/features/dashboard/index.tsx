import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardOrganizerPage from "./organizer";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <header className="border-b bg-background shadow-sm">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium text-primary">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <DashboardOrganizerPage />
    </div>
  );
};

export default DashboardPage;
