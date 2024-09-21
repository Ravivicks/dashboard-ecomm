"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "./actions";
import Image from "next/image";
import { IComment } from "@/types";

export const columns: ColumnDef<IComment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "firstName",
    header: () => "First Name",
    cell: ({ row }) => row.original.firstName || "N/A",
  },
  {
    accessorKey: "lastName",
    header: () => "Last Name",
    cell: ({ row }) => row.original.lastName || "N/A",
  },
  {
    accessorKey: "comment",
    header: () => "Comment",
    cell: ({ row }) => row.original.comment,
  },
  {
    accessorKey: "rating",
    header: () => "Rating",
    cell: ({ row }) => row.original.rating.toFixed(1),
  },
  {
    id: "likes",
    header: () => "Likes",
    cell: ({ row }) => (
      <div>{row.original.likes?.filter((like) => like.isLike).length || 0}</div>
    ),
  },
  {
    id: "unlikes",
    header: () => "Unlikes",
    cell: ({ row }) => (
      <div>
        {row.original.unlikes?.filter((unlike) => unlike.isUnlike).length || 0}
      </div>
    ),
  },
  {
    id: "replies",
    header: () => "Replies",
    cell: ({ row }) => {
      const replies = row.original.replies || []; // Provide a default empty array if replies are undefined
      return (
        <div>
          {replies.length > 0 ? (
            replies.map((reply, index) => (
              <div key={index} className="text-xs space-y-1 mt-1">
                <p>
                  <strong>
                    {reply.firstName || "Anonymous"} {reply.lastName || ""}:
                  </strong>{" "}
                  {reply.comment}
                </p>
                {index < replies.length - 1 && <hr />}{" "}
                {/* Separator between replies */}
              </div>
            ))
          ) : (
            <p>No replies</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => "Created At",
    cell: ({ row }) =>
      row.original.createdAt
        ? new Date(row.original.createdAt).toLocaleString()
        : "N/A",
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original._id as string} />,
  },
];
