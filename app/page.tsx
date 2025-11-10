import { AuthForm } from "@/components/Forms/AuthForm";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import PasskeyModal from "@/components/ui/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

interface adminvalueprop {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home(params: adminvalueprop) {
  const searchParamsObj = params.searchParams ? await params.searchParams : {};
  const isadmin = searchParamsObj.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isadmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <h1 className="text-36-bold mb-12 text-center">
            <span className="text-purple-500">Appoint</span>
            Bit
          </h1>
          <AuthForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 ">
              © 2025 AppointBit
            </p>
            <Link href={"/?admin=true"} className="text-purple-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.jpg"
        height={1000}
        width={1000}
        alt="agents"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
