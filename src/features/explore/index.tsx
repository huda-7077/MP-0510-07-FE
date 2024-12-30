import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ExploreList from "./components/ExploreList";

const ExplorePage = () => {
  return (
    <>
      <main className="container mx-auto">
        <Navbar />
        <ExploreList />
      </main>
      <Footer />
    </>
  );
};

export default ExplorePage;
