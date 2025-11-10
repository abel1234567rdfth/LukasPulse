import RegisterForm from "@/components/Forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RegisterPageProps {
  params: Promise<{ userId: string }>;
}

const Register = async ({ params }: RegisterPageProps) => {
  const { userId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/actions/customeractions/get-user?userId=${userId}`,
    {
      cache: "no-store",
    }
  );
  const user = await res.json();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href={"/"}>
            <h1 className="text-36-bold mb-12 text-center">
              <span className="text-purple-500">Appoint</span>
              Bit
            </h1>
          </Link>
          <RegisterForm user={user} />
          <p className="copyright py-12 ">© 2025 AppointBit</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="agent"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
