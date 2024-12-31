"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const { data } = useSession();

  const user = data?.user;

  const logout = () => {
    signOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-opacity-90 backdrop-blur">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="font-serif text-4xl font-bold">
            StarTicket
          </Link>

          <div className="hidden cursor-pointer items-center gap-8 font-sans md:flex">
            {!!user?.id &&
              (user?.role === "ADMIN" || user?.role === "ORGANIZER") && (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                </>
              )}

            <Link href="/">Explore</Link>

            {!user?.id && (
              <Link href="/login" className="flex items-center gap-4">
                Sign In
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a]">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
              </Link>
            )}
            {!!user?.id && (
              <>
                <p onClick={() => router.push("/write")}>Write</p>
                <p onClick={logout}>Logout</p>
                <Link href="/account">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a]">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account">Profile</Link>
                </DropdownMenuItem>
                {!user?.id && (
                  <DropdownMenuItem>
                    <Link href="/login">Sign In</Link>
                  </DropdownMenuItem>
                )}
                {!!user?.id && (
                  <>
                    <DropdownMenuItem>
                      <p onClick={() => router.push("/write")}>Write</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <p onClick={logout}>Logout</p>
                    </DropdownMenuItem>
                  </>
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
