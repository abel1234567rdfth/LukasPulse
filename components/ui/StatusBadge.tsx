import { StatusIcon } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={cn(
        "status-badge",
        status === "scheduled" && "bg-green-600",
        status === "cancelled" && "bg-red-600",
        status === "pending" && "bg-blue-600"
      )}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3 "
      />
      <p
        className={cn(
          "text-12-semibold capitalize",
          status === "scheduled" && "text-green-500",
          status === "cancelled" && "text-red-500",
          status === "pending" && "text-blue-500"
        )}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
