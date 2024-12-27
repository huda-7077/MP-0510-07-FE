"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChangePasswordDialog } from "../components/ChangePasswordDialog";
import { ApplyOrganizerDialog } from "../components/ApplyOrganizerDialaog";
import { useSession } from "next-auth/react";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import SkeletonSettings from "../components/SkeletonSettings";

const AccountSettingsPage = () => {
  const [notifications, setNotifications] = useState(false);
  const { data: session, update: updateSession } = useSession();
  const token = session?.user.token;
  const { data, isPending: isPendingGet } = useGetProfile({ token });

  const [userRole, setUserRole] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (data) {
      setUserRole(data.role);
      const role = data.role;
      if (role === "USER") {
        setIsUser(true);
      } else if (role === "ORGANIZER") {
        setIsOrganizer(true);
      } else if (role === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, [data]);

  return (
    <main>
      <div className="text-2xl font-bold md:text-3xl">Account Settings</div>
      <p className="text-sm text-muted-foreground">
        Manage your account details
      </p>
      <div className="mt-4 space-y-3 md:space-y-6">
        <div className="flex items-center justify-between">
          <div className="mb-0 md:mb-2">
            <Label htmlFor="notifications">Notifications</Label>
            <p className="text-sm text-gray-500">Receive email notifications</p>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        {isPendingGet ? (
          <SkeletonSettings />
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <div className="mb-0 md:mb-2">
                <Label>User Roles</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{userRole}</Badge>
              </div>
            </div>
            {isUser && !isOrganizer && (
              <p className="text-sm text-gray-500">
                You have a user role. You can apply to become an organizer if
                you'd like to contribute more.
              </p>
            )}
            {isOrganizer && (
              <p className="text-sm text-gray-500">
                You are already an organizer. Thank you for your contribution!
              </p>
            )}
          </div>
        )}
        <div className="flex justify-between md:justify-normal md:gap-3">
          <div>
            <ChangePasswordDialog />
          </div>
          <div>{isUser && !isOrganizer && <ApplyOrganizerDialog />}</div>
        </div>
      </div>
    </main>
  );
};

export default AccountSettingsPage;
