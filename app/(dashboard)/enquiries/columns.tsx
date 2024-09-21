"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "./actions";
import { CommonEnquireProps } from "@/types";

export const columns: ColumnDef<CommonEnquireProps>[] = [
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
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "productDetails",
    header: "Product Details",
    cell: ({ row }) => {
      const { enquiryType, cartProduct, productName, productId, productPrice } =
        row.original;

      if (enquiryType === "cart") {
        return (
          <div>
            {cartProduct?.map((product, index) => (
              <div key={index} className="text-xs space-y-1 mt-1">
                <p>
                  <strong>Name:</strong> {product.productName}
                </p>
                <p>
                  <strong>Price:</strong> {product.productPrice}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                {index < cartProduct.length - 1 && <hr />}{" "}
                {/* Add a separator between products */}
              </div>
            ))}
          </div>
        );
      }

      if (enquiryType === "priceRequest" || enquiryType === "quoteRequest") {
        return (
          <div className="text-xs space-y-1">
            <p>
              <strong>Name:</strong> {productName}
            </p>

            <p>
              <strong>Price:</strong> {productPrice}
            </p>
          </div>
        );
      }

      return null;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Mobile
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "enquiryType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Enquiry Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "approved" ? "destructive" : "secondary"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  // Column for cart product details

  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original._id as string} />,
  },
];
