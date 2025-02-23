"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, Menu, ChevronDown, Home, Compass, LayoutDashboard, LogOut, Settings } from "lucide-react";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSession();
  const user = data?.user;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    signOut();
  };

  interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  }

  const NavLink = ({ href, children, icon: Icon }: NavLinkProps) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
          isActive
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
            : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400",
        )}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{children}</span>
        {isActive && (
          <span className="absolute bottom-0 left-0 h-0.5 w-full" />
        )}
      </Link>
    );
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 dark:text-white" 
          : "bg-white dark:bg-gray-900 dark:text-white",
      )}
    >
      <div className="w-full px-4 lg:container lg:mx-auto lg:max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 shadow-lg shadow-emerald-200 dark:shadow-emerald-800">
              <span className="font-serif text-2xl font-bold text-white">
                S
              </span>
            </div>
            <span className="font-serif text-4xl font-extrabold tracking-tight dark:text-white">
              StarTicket
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <NavLink href="/" icon={Home}>
              Home
            </NavLink>
            <NavLink href="/explore" icon={Compass}>
              Explore
            </NavLink>

            {!!user?.id &&
              (user?.role === "ADMIN" || user?.role === "ORGANIZER") && (
                <NavLink href="/dashboard" icon={LayoutDashboard}>
                  Dashboard
                </NavLink>
              )}

            <div className="mx-4 h-6 w-px bg-gray-200 dark:bg-gray-700" />

            {!user?.id && (
              <Link
                href="/login"
                className="group flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                <UserIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" />
                Sign In
              </Link>
            )}

            {!!user?.id && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-emerald-400">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <UserIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>Account</span>
                  <ChevronDown className="h-4 w-4 opacity-50 dark:text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <DropdownMenuLabel className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <UserIcon className="h-4 w-4" />
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                    <Link
                      href="/account"
                      className="flex w-full items-center gap-2 dark:text-white"
                    >
                      <Settings className="h-4 w-4 dark:text-gray-300" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700" 
                    onClick={logout}
                  >
                    <span className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              <ToggleDarkMode />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700">
              <ToggleDarkMode />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <Menu className="h-5 w-5 dark:text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <DropdownMenuItem className="dark:hover:bg-gray-700">
                  <Link href="/" className="flex w-full items-center gap-2 dark:text-white">
                    <Home className="h-4 w-4 dark:text-gray-300" />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-gray-700">
                  <Link
                    href="/explore"
                    className="flex w-full items-center gap-2 dark:text-white"
                  >
                    <Compass className="h-4 w-4 dark:text-gray-300" />
                    Explore
                  </Link>
                </DropdownMenuItem>
                {!!user?.id &&
                  (user?.role === "ADMIN" || user?.role === "ORGANIZER") && (
                    <DropdownMenuItem className="dark:hover:bg-gray-700">
                      <Link
                        href="/dashboard"
                        className="flex w-full items-center gap-2 dark:text-white"
                      >
                        <LayoutDashboard className="h-4 w-4 dark:text-gray-300" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                {!!user?.id ? (
                  <>
                    <DropdownMenuItem className="dark:hover:bg-gray-700">
                      <Link
                        href="/account"
                        className="flex w-full items-center gap-2 dark:text-white"
                      >
                        <Settings className="h-4 w-4 dark:text-gray-300" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700" 
                      onClick={logout}
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem className="dark:hover:bg-gray-700">
                    <Link
                      href="/login"
                      className="flex w-full items-center gap-2 text-emerald-600 dark:text-emerald-400"
                    >
                      <UserIcon className="h-4 w-4" />
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;