import EventAttendeesPage from "@/features/dashboard/attendee-list";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const EventAttendees = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) return redirect("/");
  if (session.user.role !== "ORGANIZER") {
    return redirect("/dashboard");
  }
  return <EventAttendeesPage eventId={params.id} />;
};

export default EventAttendees;
