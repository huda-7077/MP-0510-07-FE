import Navbar from "@/components/Navbar";
import EventList from "./components/EventList";
import { HeroSection } from "./components/HeroSection";

const HomePage = () => {
  return (
    <main className="container mx-auto flex flex-col justify-center pb-10">
      <h1 className="text-center text-xs text-gray-600 md:flex md:items-center md:text-base mx-auto">
        We're the world’s largest secondary marketplace for tickets to live
        events. Prices are set by sellers and may be below or above face value.{" "}
      </h1>
      <Navbar />
      <HeroSection />
      <EventList />
    </main>
    
  );
};

export default HomePage;
