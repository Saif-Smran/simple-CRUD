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
          <TableHead className="text-right">Created</TableHead>
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
              <TableCell className="text-right">{created}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default UsersTable;
