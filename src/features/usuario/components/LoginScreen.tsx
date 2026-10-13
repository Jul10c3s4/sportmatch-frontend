import Image from "next/image";

import { LoginForm } from "@/features/usuario/components/LoginForm";

export function LoginScreen() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-white md:grid-cols-[0.8fr_1fr]">
      <section
        aria-label="Apresentação do SportMatch"
        className="flex min-h-[240px] flex-col items-center justify-center bg-white px-6 py-10 md:min-h-screen"
      >
        <Image
          src="Logo.svg"//"/Logo%20Container.svg"
          alt="SportMatch"
          width={184}
          height={52}
          priority
          className="h-auto w-[min(100%,230px)]"
        />
        <p className="mt-5 text-sm font-medium text-[#a53e00]">
          A sua conexão com o esporte
        </p>
      </section>

      <section className="flex min-h-[calc(100vh-240px)] items-center justify-center bg-[#e5ebef] px-6 py-12 sm:px-10 md:min-h-screen lg:px-12">
        <LoginForm />
      </section>
    </main>
  );
}
