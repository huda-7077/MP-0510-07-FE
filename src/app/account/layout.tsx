import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "../../features/account/components/SidebarNav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/account",
  },
  {
    title: "Settings",
    href: "/account/settings",
  },
  {
    title: "Referrals",
    href: "/account/referrals",
  },
];

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const session = await auth();
  if (!session) return redirect("/login");
  return (
    <>
      <Navbar />
      <div className="block space-y-3 px-10 pb-16">
        <Separator className="my-6" />
        <div className="flex flex-col items-center space-y-8 lg:flex-row lg:items-start lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="w-full flex-1 md:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
