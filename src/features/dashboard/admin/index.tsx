import { CardDashboardAdminCharts } from "./components/CardDashboardAdminCharts";

const DashboardAdminPage = () => {
  return (
    <main className="flex-grow md:p-6">
      <div className="flex flex-1 flex-col gap-4 rounded-xl p-0 md:bg-muted/30 md:p-8 md:shadow-2xl dark:md:bg-muted/50">
        <CardDashboardAdminCharts />
      </div>
    </main>
  );
};

export default DashboardAdminPage;
