"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react";
import { CustomerFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";

import {
  Agents,
  CustomerFormDefaultValues,
  GenderOptions,
  IdentificationTypes,
} from "@/constants";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../ui/FileUploader";

export function RegisterForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  type CustomerFormType = z.infer<typeof CustomerFormValidation>;

  const form = useForm<CustomerFormType>({
    resolver: zodResolver(CustomerFormValidation) as Resolver<CustomerFormType>,
    defaultValues: {
      ...CustomerFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });
  console.log("FORM ERRORS", form.formState.errors);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CustomerFormValidation>) {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append all normal fields except the file
      Object.entries(values).forEach(([key, value]) => {
        if (key === "birthDate") {
          formData.append(key, new Date(value as string).toISOString());
        } else if (key !== "identificationDocument") {
          formData.append(key, value as string);
        }
      });

      if (values.identificationDocument?.length) {
        formData.append(
          "identificationDocument",
          values.identificationDocument[0]
        );
      }

      // Append userId
      formData.append("userId", user.$id);

      // Fetch request
      const res = await fetch(
        "/api/actions/customeractions/register-customer",
        {
          method: "POST",
          body: formData, // ✅ send FormData directly
        }
      );

      const customer = await res.json();

      if (customer) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about your self</p>
        </section>
        <section className="mb-12 space-y-6">
          <div className="mb-9">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          placeholder="Name"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            placeholder="Email"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone Number"
            placeholder="Phone No"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
            placeholder="Pick a Date"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            placeholder="choose gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label className="cursor-pointer" htmlFor={option}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="Address"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Ocupation"
            placeholder="Occupation"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardians name"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency Contact Numberr"
            placeholder="Emergency Phone No"
          />
        </div>
        <section className="mb-12 space-y-6">
          <div className="mb-9">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryAgent"
          label="Primary Agent"
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
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Insurance Company Name"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="Enter Insurance Policy Number"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Any allergy if you have one"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current Medication (if any)"
            placeholder="any medication you are taking"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Any Family Medical Issues"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Any Previous Medical Issue "
          />
        </div>
        <section className="mb-12 space-y-6">
          <div className="mb-9">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an Identification Type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification Number"
          placeholder="Enter Identification Number"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Identification Document"
          placeholder="Scanned Copy of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                onchange={(files) => {
                  console.log("FileUploader changed:", files);
                  field.onChange(files);
                }}
                files={field.value}
              />
            </FormControl>
          )}
        />

        <section className="mb-12 space-y-6">
          <div className="mb-9">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="appointmentConsent"
          label="I consent to the appointment"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
