import Navbar from "@/components/Navbar";
import EventList from "./components/EventList";
import { HeroSection } from "./components/HeroSection";

const HomePage = () => {
  return (
    <>
      <main className="min-h-screen w-full">
        <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto">
            <Navbar />
          </div>
        </div>

        <div className="w-full pt-10">
          <HeroSection />
        </div>

        <div className="container mx-auto">
          <EventList />
        </div>

        <div className="container mx-auto mt-20 px-4 pb-10">
          <div className="rounded-xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              About Our Ticket Marketplace
            </h2>
            <p className="text-gray-600">
              Our marketplace provides a secure platform for buying and selling
              tickets to your favorite events. Whether you're looking for
              concerts, sports, or theater events, we ensure a seamless
              transaction process with our guaranteed authenticity policy.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
