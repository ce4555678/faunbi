import { SignUp } from "@clerk/nextjs"

export const metadata = {
  title: "Criar conta",
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  )
}
