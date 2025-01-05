import PaymentsPage from "@/features/dashboard/payments";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Events = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  if (session.user.role !== "ORGANIZER") {
    return redirect("/dashboard");
  }
  return <PaymentsPage />;
};

export default Events;
