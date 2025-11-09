"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import StatusBadge from "../ui/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Agents } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../ui/AppointmentActionModal";
import { Appointment } from "@/types/appwrite.types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "Customer",
    header: "customer",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.customer.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-100px">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryAgent",
    header: () => "Agent",
    cell: ({ row }) => {
      const agent = Agents.find(
        (agent) => agent.name === row.original.primaryAgent
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={agent?.image!}
            alt={agent?.name!}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">{agent?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type={"schedule"}
            customerId={data.customer.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type={"cancel"}
            customerId={data.customer.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];
