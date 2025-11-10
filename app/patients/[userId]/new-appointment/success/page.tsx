import { Button } from "@/components/ui/button";
import { Agents } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RegisterPageProps {
  params: Promise<{ userId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const success = async ({ params, searchParams }: RegisterPageProps) => {
  const paramsObj = await params; // resolve params Promise
  const searchParamsObj = searchParams ? await searchParams : {};

  const { userId } = paramsObj;
  const appointmentId = (searchParamsObj.appointmentId as string) || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/actions/appointmentactions/get-appointment?appointmentId=${appointmentId}`
  );
  const appointment = await res.json();

  const agent = Agents.find((agent) => agent.name === appointment.primaryAgent);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href={"/"}>
          <h1 className="text-36-bold mb-12 text-center">
            <span className="text-purple-500">Appoint</span>
            Bit
          </h1>
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src={"/assets/gifs/submitted.gif"}
            width={280}
            height={300}
            alt="success"
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-purple-500">appointment request </span>
            has been successfully submitted!
          </h2>

          <p className="text-gray-500">
            We will be in touch shortly to confirm.
          </p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={agent?.image!}
              alt="agent"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Agent {agent?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src={"/assets/icons/calendar.svg"}
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright"> © 2025 AppointBit</p>
      </div>
    </div>
  );
};

export default success;
// commit this working version
