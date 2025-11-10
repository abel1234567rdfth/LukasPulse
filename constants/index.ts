import { CustomerFormValidation } from "@/lib/validation";
import z from "zod";

export const GenderOptions = ["Male", "Female"];

export const CustomerFormDefaultValues: z.infer<typeof CustomerFormValidation> =
  {
    name: "",
    email: "",
    phone: "",
    birthDate: new Date(),
    gender: "Male",
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryAgent: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "",
    identificationNumber: "",
    identificationDocument: [], //

    disclosureConsent: false,
    appointmentConsent: false,
    privacyConsent: false,
  };

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Agents = [
  {
    image: "/assets/images/green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
