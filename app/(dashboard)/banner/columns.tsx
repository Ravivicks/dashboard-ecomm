import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "./actions";
import { IPartnerBannerFile } from "@/types";
import Image from "next/image";

export const columns: ColumnDef<IPartnerBannerFile>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Image
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const [isPreviewOpen, setIsPreviewOpen] = useState(false);
      const [hovering, setHovering] = useState(false);
      const imageUrl = row.original.imageId; // Assuming 'imageId' holds the image ID
      const fullImageUrl = imageUrl
        ? `${process.env.NEXT_PUBLIC_APP_URL}api/images/${imageUrl}`
        : "";

      return (
        <div
          className="relative w-[100px] h-[100px] overflow-hidden rounded"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Image */}
          <Image
            src={fullImageUrl}
            alt={row.getValue("title") as string}
            className="object-fit"
            fill
            unoptimized
          />

          {/* Eye Icon */}
          {hovering && !isPreviewOpen && (
            <div
              className="absolute top-[30%] right-[30%] bg-black bg-opacity-50 p-1 rounded-full cursor-pointer"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Eye className="h-6 w-6 text-white" />
            </div>
          )}

          {/* Image Preview Modal */}
          {isPreviewOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
              onClick={() => setIsPreviewOpen(false)}
            >
              <div className="relative">
                <Image
                  src={fullImageUrl}
                  alt={row.getValue("title") as string}
                  className="object-contain"
                  width={600}
                  height={400}
                  unoptimized
                />
                <button
                  className="absolute top-2 right-2 text-white bg-black rounded-full p-1"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original._id} />,
  },
];
