"use client";

import Footer from "@/components/Footer";
import HomePage from "@/features/home";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const Page = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Main Content */}
      <HomePage />
      
      {/* Footer with Top Border */}
      <div className="mt-20 border-t bg-gray-50">
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl ${
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Gradient Background Effect - Optional */}
      <div className="pointer-events-none fixed inset-0 z-30 bg-gradient-to-b from-transparent via-transparent to-white/10" />
    </div>
  );
};

export default Page;