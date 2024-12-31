import EventDetailPage from "@/features/event/EventDetailPage";

const EventDetail = ({ params }: { params: { id: string } }) => {
  return <EventDetailPage eventId={Number(params.id)} />;
};

export default EventDetail;
