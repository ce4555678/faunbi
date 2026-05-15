import { AppSidebar } from "@/components/app-sidebar"
import ButtonTheme from "@/components/button-theme"
import RouteBreadcrumb from "@/components/route-breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/spinner"
import { Suspense } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="overflow-hidden">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
          <div className="flex w-full items-center gap-3 px-3 sm:px-4">
            <SidebarTrigger className="-ml-1 size-8 rounded-lg" />

            <Separator orientation="vertical" className="h-4" />

            <Suspense fallback={<Spinner className="size-5" />}>
              <div className="flex w-full items-center justify-between">
                <RouteBreadcrumb />
                <ButtonTheme />
              </div>
            </Suspense>
          </div>
        </header>

        <main className="h-[calc(100svh-3.5rem)] overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
