import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border border-t-2 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
                <span className="text-sm text-white">✓</span>
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
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-black" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Our Company</h4>
            <ul className="space-y-3">
              {["About Us", "Affiliate Program", "Careers"].map((item) => (
                <li key={item} className="cursor-pointer hover:text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Have Questions?</h4>
            <p className="cursor-pointer hover:text-gray-800">
              Help Center / Contact Us
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">
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

        <div className="mt-12 border-t pt-8 text-sm">
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
