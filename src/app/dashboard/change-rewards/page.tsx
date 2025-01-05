import ChangeRewardsPage from "@/features/dashboard/change-rewards";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
const ChangeRewards = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  if (session.user.role !== "ADMIN") {
    return redirect("/dashboard");
  }
  return <ChangeRewardsPage />;
};

export default ChangeRewards;
