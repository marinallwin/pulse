import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { ProductShowcase } from '../components/landing/ProductShowcase';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { FAQ } from '../components/landing/FAQ';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <ProductShowcase />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <FAQ />
            <FinalCTA />
            <Footer />
        </div>
    );
}
