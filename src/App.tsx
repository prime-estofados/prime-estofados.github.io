import Header from './components/Header'
import HeroScrollVideo from './components/HeroScrollVideo'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import Impermeabilizacao from './components/Impermeabilizacao'
import HowItWorks from './components/HowItWorks'
import Differentials from './components/Differentials'
import Testimonials from './components/Testimonials'
import InstagramSection from './components/InstagramSection'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroScrollVideo />
        <TrustBar />
        <Services />
        <Impermeabilizacao />
        <HowItWorks />
        <Differentials />
        <Testimonials />
        <InstagramSection />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
