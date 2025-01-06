"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ExploreList from "./components/ExploreList";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ExplorePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Events List */}
        <ExploreList />
      </div>

      {/* Footer */}
      <div className="mt-20 border-t bg-white">
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Subtle Background Gradient */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
    </div>
  );
};

export default ExplorePage;
