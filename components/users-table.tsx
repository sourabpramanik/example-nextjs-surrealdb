import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UsersTableDataProps {
  users: {
    id: string;
    email: string;
    name: string;
    image: string;
  }[];
}

const UsersTable = (props: UsersTableDataProps) => {
  const { users } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">Avatar</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(({ id, name, image, email }) => (
          <TableRow key={id}>
            <TableCell>
              <Avatar className="h-8 w-8">
                <AvatarImage src={image} alt={name ?? "anonymous"} />
                <AvatarFallback>
                  {name ? name.slice(0, 2).toUpperCase() : "AN"}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{id.replace("user:", "")}</TableCell>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
