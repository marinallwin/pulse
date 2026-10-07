import { Database, BarChart, Lightbulb, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

export function HowItWorks() {
    const [titleRef, titleVisible] = useScrollAnimation();
    const [stepsRef, stepsVisible] = useScrollAnimation({ threshold: 0.2 });

    const steps = [
        {
            icon: Database,
            title: 'Connect your data',
            description: 'Link your existing tools and data sources in minutes.',
        },
        {
            icon: BarChart,
            title: 'Pulse organizes your metrics',
            description: 'Your data is automatically structured and ready to explore.',
        },
        {
            icon: Lightbulb,
            title: 'Understand what is changing',
            description: 'See trends, patterns, and opportunities at a glance.',
        },
    ];

    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div
                    ref={titleRef}
                    className={cn("text-center mb-8 sm:mb-12 md:mb-16 fade-in-up", titleVisible && "visible")}
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 px-2">
                        Simple to start, powerful to use
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                        Get up and running in minutes, not weeks.
                    </p>
                </div>

                <div
                    ref={stepsRef}
                    className={cn("grid sm:grid-cols-3 gap-6 sm:gap-8 relative stagger-children", stepsVisible && "visible")}
                >
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.title} className="relative">
                                <div className="text-center">
                                    <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary text-white mb-3 md:mb-4 relative z-10">
                                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                                    </div>
                                    {index < steps.length - 1 && (
                                        <ArrowRight className="hidden sm:block absolute top-6 md:top-8 left-[60%] h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
                                    )}
                                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 md:mb-2">{step.title}</h3>
                                    <p className="text-sm sm:text-base text-muted-foreground px-2">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
