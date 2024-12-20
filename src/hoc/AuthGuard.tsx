import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AuthGuard(Component: any) {
  return async function IsAuth(props: any) {
    const session = await auth();

    if (!session) return redirect("/login");

    return <Component {...props} />;
  };
}
