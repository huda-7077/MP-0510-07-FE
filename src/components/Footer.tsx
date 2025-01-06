import { Button } from "@/components/ui/button";
import { CheckIcon, Globe, ChevronRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Guarantee Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 shadow-sm">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">StarTicket guarantee</span>
            </div>
            <ul className="space-y-4">
              {[
                "World class security checks",
                "Transparent pricing",
                "100% order guarantee",
                "Customer service from start to finish",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600">
                  <CheckIcon className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Our Company</h4>
            <ul className="space-y-4">
              {["About Us", "Affiliate Program", "Careers"].map((item) => (
                <li 
                  key={item} 
                  className="group flex cursor-pointer items-center text-sm text-gray-600 transition-colors hover:text-emerald-600"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Have Questions?</h4>
            <p className="group flex cursor-pointer items-center text-sm text-gray-600 transition-colors hover:text-emerald-600">
              <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              Help Center / Contact Us
            </p>
          </div>

          {/* Location Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">
              Live events all over the world
            </h4>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="group w-full justify-between border-gray-200 px-4 py-6 text-left text-gray-600 hover:border-emerald-600 hover:text-emerald-600"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4" />
                  <span>Worldwide</span>
                </div>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                className="group w-full justify-between border-gray-200 px-4 py-6 text-left text-gray-600 hover:border-emerald-600 hover:text-emerald-600"
              >
                <span>English (US)</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                className="group w-full justify-between border-gray-200 px-4 py-6 text-left text-gray-600 hover:border-emerald-600 hover:text-emerald-600"
              >
                <span>Indonesian Rupiah</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="space-y-4 text-sm text-gray-500">
            <p className="font-medium">© StarTicket 2024 Company Details</p>
            <p className="leading-relaxed">
              Use of this web site constitutes acceptance of the{" "}
              <span className="cursor-pointer text-emerald-600 hover:underline">Terms and Conditions</span> and{" "}
              <span className="cursor-pointer text-emerald-600 hover:underline">Privacy Policy</span> and{" "}
              <span className="cursor-pointer text-emerald-600 hover:underline">Cookies Policy</span> and{" "}
              <span className="cursor-pointer text-emerald-600 hover:underline">Mobile Privacy Policy</span>
              {" "}Do Not Share My Personal Information/Your Privacy Choices
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;