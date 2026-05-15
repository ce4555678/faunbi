import ButtonTheme from "@/components/button-theme"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Login",
  description: "Entre em sua conta para acessar o Faunbi",
}
export default function LoginPage() {
  return (
    <div className="grid min-h-svh bg-white lg:grid-cols-2 dark:bg-slate-950">
      <div className="flex flex-col gap-4 bg-white p-6 md:p-10 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/faunbi.svg"
              alt="Faunbi Logo"
              width={24}
              height={24}
              className="size-6"
            />
            Faunbi
          </Link>
          <ButtonTheme />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/signin.avif"
          alt="login image"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
