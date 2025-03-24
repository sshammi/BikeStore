/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button } from "@/components/ui/button"; // Using ShadCN button
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBlockUserMutation } from '@/redux/features/auth/authApi';
import { useGetAllUsersQuery } from '@/redux/features/auth/authApi';
import { Skeleton } from '@/components/ui/skeleton';

const Users = () => {
  const { data: usersResponse, error, isLoading } = useGetAllUsersQuery({});
  const users = usersResponse?.data || [];
  const [blockUser] = useBlockUserMutation();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  if (isLoading) return <p><Skeleton className="w-[100px] h-[20px] rounded-full" /></p>;
  if (error) return <p>Failed to fetch users</p>;

  const handleDeactivate = async (userId: string) => {
    setLoadingUserId(userId);
    try {
      await blockUser(userId).unwrap();
    } catch (error) {
      console.error("Failed to deactivate user:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {users.length > 0 ? (
    users.map((user: any) => (
      <TableRow key={user._id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          {user.deactive ? (
            <span className="text-red-500">Deactivated</span>
          ) : (
            <span className="text-green-500">Active</span>
          )}
        </TableCell>
        <TableCell>
          {!user.deactive && (
            <Button
              onClick={() => handleDeactivate(user._id)}
              disabled={loadingUserId === user._id}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {loadingUserId === user._id ? "Processing..." : "Deactivate"}
            </Button>
          )}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} className="text-center">
        No users found
      </TableCell>
    </TableRow>
  )}
</TableBody>

      </Table>
    </div>
  );
};

export default Users;

