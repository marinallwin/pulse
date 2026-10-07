import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

export function FinalCTA() {
    const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
            <div
                ref={ctaRef}
                className={cn("max-w-4xl mx-auto text-center scale-in", ctaVisible && "visible")}
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
                    Your business is already generating the data.
                    <br className="hidden sm:block" />
                    <span className="sm:inline block mt-2 sm:mt-0"> Pulse helps you understand it.</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-4">
                    Join growing businesses that use Pulse to make better decisions.
                </p>
                <a href="/dashboard">
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 text-sm sm:text-base">
                        Start using Pulse <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </a>
            </div>
        </section>
    );
}
