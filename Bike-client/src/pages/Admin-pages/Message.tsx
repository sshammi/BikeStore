/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Using ShadCN button
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteMessageMutation, useGetAllMessagesQuery } from "@/redux/features/msg/msgApi";

const AdminMessages = () => {
  const { data: messagesResponse, error, isLoading } = useGetAllMessagesQuery({});
  const messages = messagesResponse?.data || [];
  const [deleteMessage] = useDeleteMessageMutation();
  const [loadingMessageId, setLoadingMessageId] = useState<string | null>(null);

  if (isLoading) return <p><Skeleton className="w-[100px] h-[20px] rounded-full" /></p>;
  if (error) return <p>Failed to fetch messages</p>;

  const handleDelete = async (messageId: string) => {
    setLoadingMessageId(messageId);
    try {
      await deleteMessage(messageId).unwrap();
    } catch (error) {
      console.error("Failed to delete message:", error);
    } finally {
      setLoadingMessageId(null);
    }
  };

  return (
    <div className="p-14">
      <h2 className="text-2xl font-bold mb-4">Messages List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sender Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length > 0 ? (
            messages.map((message: any) => (
              <TableRow key={message._id}>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.message}</TableCell>
                <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(message._id)}
                    disabled={loadingMessageId === message._id}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    {loadingMessageId === message._id ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No messages found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminMessages;
