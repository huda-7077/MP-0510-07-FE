import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-8 border border-t-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="font-semibold">StarTicket guarantee</span>
            </div>
            <ul className="space-y-3">
              {[
                "World class security checks",
                "Transparent pricing",
                "100% order guarantee",
                "Customer service from start to finish",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <CheckIcon className="h-4 w-4 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Company</h4>
            <ul className="space-y-3">
              {["About Us", "Affiliate Program", "Careers"].map((item) => (
                <li
                  key={item}
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Have Questions?</h4>
            <p className="text-gray-600 hover:text-gray-800 cursor-pointer">
              Help Center / Contact Us
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Live events all over the world
            </h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                worldwide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                English (US)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Indonesian Rupiah
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-sm text-gray-500">
          <p>© viagogo GmbH 2024 Company Details</p>
          <p className="mt-2">
            Use of this web site constitutes acceptance of the Terms and
            Conditions and Privacy Policy and Cookies Policy and Mobile Privacy
            Policy Do Not Share My Personal Information/Your Privacy Choices
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
