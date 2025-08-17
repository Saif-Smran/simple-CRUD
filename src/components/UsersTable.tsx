import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "../../server/user";
import type { UserSelect } from "@/db/schema";
import { PencilIcon} from "lucide-react";
import { Button } from "./ui/button";
import DeleteUserBtn from "./DeleteUserBtn";

async function UsersTable() {
  const users: UserSelect[] = await getUsers();

  return (
    <Table>
  <TableCaption>Registered users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Serial</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Age</TableHead>
          <TableHead className="">Created</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => {
          const created = user.createdAt ? new Date(user.createdAt as unknown as string).toLocaleDateString() : "-";
          return (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{index +1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell className="">{created}</TableCell>
              <TableCell className="text-center space-x-4">
                <Button variant="ghost" className="cursor-pointer"><PencilIcon size={16} /></Button>
                <DeleteUserBtn userId={user.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default UsersTable;
