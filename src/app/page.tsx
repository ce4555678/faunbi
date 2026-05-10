// import { Header } from "@/components/landing/header"
// import { Hero } from "@/components/landing/hero"
// import { Features } from "@/components/landing/features"
// import { HowItWorks } from "@/components/landing/how-it-works"
// import { Modules } from "@/components/landing/modules"
// import { Pricing } from "@/components/landing/pricing"
// import { Testimonials } from "@/components/landing/testimonials"
// import { FAQ } from "@/components/landing/faq"
// import { CTA } from "@/components/landing/cta"
// import { Footer } from "@/components/landing/footer"

import LandingUI from "@/components/landingUi"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingUI.header />
      <main>
        <LandingUI.hero />
        <LandingUI.features />
        <LandingUI.howItWorks />
        <LandingUI.modules />
        <LandingUI.testimonials />
        <LandingUI.pricing />
        <LandingUI.faq />
        <LandingUI.cta />
      </main>
      <LandingUI.footer />
    </div>
  )
}
