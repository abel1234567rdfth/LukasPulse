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
      cache: "no-store", // optional, ensures fresh data
    }
  );
  const user = await res.json();
  console.log(user);

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO:OTP Verification | PassKeyModal */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 ">
              © 2025 LukasPulse
            </p>
            <Link href={"/?admin=true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
