import UsersTable from "@/components/UsersTable";
import AddUserDialog from "@/components/AddUserDialog";

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Users:</h1>
      <AddUserDialog />
      <UsersTable />
    </div>
  );
}
