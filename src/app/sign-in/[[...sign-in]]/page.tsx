import { SignIn } from "@clerk/nextjs"

export const metadata = {
  title: "Entrar",
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
