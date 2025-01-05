import UserListsPage from "@/features/dashboard/user-lists";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const UserLists = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  if (session.user.role !== "ADMIN") {
    return redirect("/dashboard");
  }
  return <UserListsPage />;
};

export default UserLists;
