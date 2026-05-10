import { CTALandingUi } from "./cta-landingUi"
import { FAQLandingUi } from "./faq-landingUi"
import FeaturesLandingUi from "./features-landingUi"
import FooterLandingUi from "./footer-landingUi"
import { HeaderLandingUi } from "./header-landingUi"
import HeroLandingUi from "./hero-landingUi"
import HowItWorksLandingUi from "./how-it-works-landingUi"
import ModulesLandingUi from "./modules-landingUi"
import { PricingLandingUi } from "./pricing-landingUi"
import { TestimonialsLandingUi } from "./testimonials-landingUi"

const LandingUi = {
  hero: HeroLandingUi,
  features: FeaturesLandingUi,
  howItWorks: HowItWorksLandingUi,
  modules: ModulesLandingUi,
  testimonials: TestimonialsLandingUi,
  pricing: PricingLandingUi,
  faq: FAQLandingUi,
  cta: CTALandingUi,
  header: HeaderLandingUi,
  footer: FooterLandingUi
}

export default LandingUi
