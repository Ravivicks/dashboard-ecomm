"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "./actions";
import Image from "next/image";
import { CheckoutData } from "@/types";

export const columns: ColumnDef<CheckoutData>[] = [
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
        User Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "items",
    header: () => "Items",
    cell: ({ row }) => (
      <div>
        {row.original.items.map((product, index) => (
          <div key={index} className="text-xs space-y-1 mt-1">
            <p>
              <strong>Name:</strong> {product.name}
            </p>
            <p>
              <strong>Price:</strong> {product.price}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            {index < row.original.items.length - 1 && <hr />}{" "}
            {/* Add a separator between products */}
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => "Total Amount",
    cell: ({ row }) => row.original.totalAmount.toFixed(2),
  },
  {
    id: "billingAddress",
    header: () => "Billing Address",
    cell: ({ row }) => (
      <div className="text-xs">
        <p>
          {row.original.billingAddress.firstName}{" "}
          {row.original.billingAddress.lastName}
        </p>
        <p>
          {row.original.billingAddress.address},{" "}
          {row.original.billingAddress.city}
        </p>
        <p>
          {row.original.billingAddress.state},{" "}
          {row.original.billingAddress.zipcode}
        </p>
        <p>{row.original.billingAddress.country}</p>
        <p>{row.original.billingAddress.phone}</p>
      </div>
    ),
  },
  {
    id: "paymentDetails",
    header: () => "Payment Details",
    cell: ({ row }) => (
      <div className="text-xs">
        <p>Method: {row.original.paymentDetails.method}</p>
        <p>Status: {row.original.paymentDetails.status}</p>
        <p>Transaction ID: {row.original.paymentDetails.transactionId}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original._id} />,
  },
];
