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
  token: string | undefined;
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

const TableUserLists: FC<TableUserListsProps> = ({ data, page, token }) => {
  return (
    <Table className="w-full border border-gray-200 text-sm dark:border-gray-700">
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-700">
          <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
            No
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
            Name
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
            Email
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
            Role
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
            Status
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
            Request
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
            CreatedAt
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((user, index) => (
          <TableRow
            key={index}
            className="hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <TableCell className="border-t px-4 py-2 text-gray-600 dark:text-gray-300">
              {index + 1 + data.meta.take * (page - 1)}
            </TableCell>
            <TableCell className="flex flex-row items-center gap-2 border-t px-4 py-2 text-gray-800 dark:text-white">
              <Avatar className="h-8 w-8 items-center">
                <AvatarImage src={user.profilePicture} alt={user.fullname} />
                <AvatarFallback className="rounded-lg text-sm">
                  CN
                </AvatarFallback>
              </Avatar>
              <span className="">{user.fullname}</span>
            </TableCell>
            <TableCell className="border-t px-4 py-2 text-gray-600 dark:text-gray-300">
              {user.email}
            </TableCell>
            <TableCell className="border-t px-4 py-2 text-gray-600 dark:text-gray-300">
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
                <RequestOrganizerDialog
                  organizerData={user.organizers}
                  token={token!}
                />
              )}
            </TableCell>
            <TableCell className="border-t px-4 py-2">
              {format(user.createdAt, "dd-MM-yyyy HH:mm:ss")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableUserLists;
