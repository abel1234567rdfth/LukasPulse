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
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* 🔹 Background Image (dimmed) */}
      <Image
        src="/assets/images/onboarding-img.jpg"
        alt="Background"
        fill
        priority
        className="object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🔹 Auth Form Container */}
      <section className="relative z-10 w-full max-w-[480px] rounded-2xl bg-white/5 backdrop-blur-md p-10  shadow-2xl border border-white/20">
        {isadmin && <PasskeyModal />}

        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          <span className="text-purple-500">Appoint</span>Bit
        </h1>

        <AuthForm />

        <div className="mt-10 flex justify-between text-sm text-gray-300">
          <p>© 2025 AppointBit</p>
          <Link
            href="/?admin=true"
            className="text-purple-400 hover:text-purple-300"
          >
            Admin
          </Link>
        </div>
      </section>
    </div>
  );
}
