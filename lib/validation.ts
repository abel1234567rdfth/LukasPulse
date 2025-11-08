import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const CustomerFormValidation = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z
    .string()
    .refine((v) => /^\+\d{10,15}$/.test(v), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female"]),
  address: z.string().min(5).max(500),
  occupation: z.string().min(2).max(500),
  emergencyContactName: z.string().min(2).max(50),
  emergencyContactNumber: z
    .string()
    .refine((v) => /^\+\d{10,15}$/.test(v), "Invalid phone number"),
  primaryAgent: z.string().min(2),
  insuranceProvider: z.string().min(2).max(50),
  insurancePolicyNumber: z.string().min(2).max(50),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),

  // ✅ Correctly typed
  identificationDocument: z
    .custom<File[]>(
      (val) => Array.isArray(val) && val.every((f) => f instanceof File),
      { message: "Invalid file format" }
    )
    .optional(),

  disclosureConsent: z.boolean().refine((v) => v, {
    message: "You must consent to disclosure to proceed",
  }),
  appointmentConsent: z.boolean().refine((v) => v, {
    message: "You must consent to disclosure to proceed",
  }),
  privacyConsent: z.boolean().refine((v) => v, {
    message: "You must consent to privacy to proceed",
  }),
});

export const CreateAppointmentSchema = z.object({
  primaryAgent: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryAgent: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryAgent: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
