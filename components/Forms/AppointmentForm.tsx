"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react";
import {
  CreateAppointmentSchema,
  getAppointmentSchema,
  UserFormValidation,
} from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./AuthForm";
import Image from "next/image";
import { Agents } from "@/constants";
import { SelectItem } from "../ui/select";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

export function AppointmentForm({
  userId,
  customerId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  customerId: string;
  type: "create" | "cancel" | "schedule";
  appointment: Appointment;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //   form structure.

  const AppointmentFormValidation = getAppointmentSchema(type);

  type AppointmentFormType = z.infer<typeof AppointmentFormValidation>;

  const form = useForm<AppointmentFormType>({
    resolver: zodResolver(
      AppointmentFormValidation
    ) as Resolver<AppointmentFormType>,
    defaultValues: {
      primaryAgent: appointment ? appointment.primaryAgent : "",
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: (appointment && appointment.cancellationReason) || "",
    },
  });

  //   submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status: Status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && customerId) {
        const appointmentData = {
          userId,
          customer: customerId,
          primaryAgent: values.primaryAgent,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status,
        };

        const res = await fetch(
          "/api/actions/appointmentactions/create-appointment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentData),
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to create appointment: ${res.statusText}`);
        }

        const appointment = await res.json();

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id,
          appointment: {
            primaryAgent: values?.primaryAgent,
            schedule: new Date(values?.schedule),
            status: status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };

        const res = await fetch(
          "/api/actions/appointmentactions/update-appointment",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentToUpdate),
          }
        );
        const updatedAppointment = await res.json();
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;

    case "create":
      buttonLabel = "Create Appointment";
      break;

    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment 👋</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryAgent"
              label="Agent"
              placeholder="Select an Agent"
            >
              {Agents.map((Agent) => (
                <SelectItem key={Agent.name} value={Agent.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={Agent.image}
                      width={32}
                      height={32}
                      alt={Agent.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{Agent.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              placeholder=" date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Note"
                placeholder="Enter note"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Cancellation Reason"
            placeholder="Enter reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={cn(
            "w-full",
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          )}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
}

export default AppointmentForm;
