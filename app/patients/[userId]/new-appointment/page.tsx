import { AppointmentForm } from "@/components/Forms/AppointmentForm";
import PatientForm from "@/components/Forms/PatientForm";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface RegisterPageProps {
  params: Promise<{ userId: string }>;
}

export default async function NewAppointment({ params }: RegisterPageProps) {
  const { userId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/actions/customeractions/get-customer?userId=${userId}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  const customer = data.documents[0];

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            customerId={customer.$id}
          />

          <p className="copyright mt-10 py-12">© 2025 LukasPulse</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
