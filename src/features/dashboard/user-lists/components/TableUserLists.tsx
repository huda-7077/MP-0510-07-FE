"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user";
import { format } from "date-fns";
import { FC } from "react";
import RequestOrganizerDialog from "./RequestOrganizerDialog";

interface TableUserListsProps {
  data: { data: User[]; meta: { take: number } };
  page: number;
}

const getBadgeRoleVariant = (status: string) => {
  switch (status) {
    case "USER":
      return "user";
    case "ORGANIZER":
      return "organizer";
    case "ADMIN":
      return "admin";
    default:
      return "default";
  }
};

const getBadgeStatusVariant = (status: string) => {
  switch (status) {
    case "false":
      return "success";
    case "true":
      return "organizer";
    default:
      return "default";
  }
};

const TableUserLists: FC<TableUserListsProps> = ({ data, page }) => {
  return (
    <div className="mx-auto overflow-x-scroll rounded-md border">
      <div className="flex min-h-[60vh] md:min-h-[55vh]">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                No
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Email
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Role
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Request
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                CreatedAt
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((user, index) => (
              <TableRow
                key={index}
                className="border-b transition-colors hover:bg-muted"
              >
                <TableCell className="px-6 py-3 text-sm">
                  {index + 1 + data.meta.take * (page - 1)}
                </TableCell>
                <TableCell className="flex flex-row items-center gap-2 px-6 py-2 text-sm">
                  <Avatar className="flex h-8 w-8 items-center">
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user.fullname}
                    />
                    <AvatarFallback className="rounded-lg text-sm">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex">{user.fullname}</span>
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {user.email}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  <Badge
                    variant={getBadgeRoleVariant(user.role)}
                    className="h-6 rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="border-t px-4 py-2">
                  <Badge
                    className="h-6 rounded-full px-3 py-1 font-medium"
                    variant={getBadgeStatusVariant(user.isDeleted.toString())}
                  >
                    {user.isDeleted ? "Inactive" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="border-t px-4 py-2">
                  {user.organizers && (
                    <RequestOrganizerDialog organizerData={user.organizers} />
                  )}
                </TableCell>
                <TableCell className="border-t px-4 py-2">
                  {format(user.createdAt, "dd-MM-yyyy HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableUserLists;
