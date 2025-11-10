import { AppointmentForm } from "@/components/Forms/AppointmentForm";

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
    <div className="flex    max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href={"/"}>
            <h1 className="text-36-bold mb-12 text-center">
              <span className="text-purple-500">Appoint</span>
              Bit
            </h1>
          </Link>
          <AppointmentForm
            type="create"
            userId={userId}
            customerId={customer.$id}
          />

          <p className="copyright mt-10 py-12">© 2025 AppointBit</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img  max-w-[390px]   bg-bottom"
      />
    </div>
  );
}
