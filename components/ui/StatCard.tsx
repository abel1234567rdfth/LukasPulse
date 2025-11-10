"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface statcardprop {
  count: number;
  label: string;
  icon: string;
  type: "appointments" | "pending" | "cancelled";
}

const StatCard = ({ count = 0, label, icon, type }: statcardprop) => {
  return (
    <div
      className={cn(
        "stat-card",
        type === "appointments" && "bg-appointments",
        type === "pending" && "bg-pending",
        type === "cancelled" && "bg-cancelled"
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular text-dark-700">{label}</p>
    </div>
  );
};

export default StatCard;
