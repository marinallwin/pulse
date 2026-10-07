import { BarChart3, Users, TrendingUp, ShoppingCart, Activity, FileText } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

export function Features() {
    const [titleRef, titleVisible] = useScrollAnimation();
    const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });

    const features = [
        {
            icon: BarChart3,
            title: 'Revenue Intelligence',
            description: 'Understand revenue trends and identify growth opportunities with clear, actionable insights.',
        },
        {
            icon: Users,
            title: 'Customer Analytics',
            description: 'Track customer growth, behavior, and lifetime value to build better relationships.',
        },
        {
            icon: TrendingUp,
            title: 'Conversion Tracking',
            description: 'Monitor how effectively visitors become customers and optimize your funnel.',
        },
        {
            icon: ShoppingCart,
            title: 'Order Insights',
            description: 'Track order volume, average order value, and purchasing patterns over time.',
        },
        {
            icon: Activity,
            title: 'Real-Time Visibility',
            description: 'See the most important business metrics in one place, updated in real-time.',
        },
        {
            icon: FileText,
            title: 'Actionable Reporting',
            description: 'Turn raw business data into useful insights that drive decision-making.',
        },
    ];

    return (
        <section id="features" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div
                    ref={titleRef}
                    className={cn("text-center mb-8 sm:mb-12 md:mb-16 fade-in-up", titleVisible && "visible")}
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 px-2">
                        Built for growing businesses
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                        Pulse gives you the tools to understand your business performance and make smarter decisions.
                    </p>
                </div>

                <div
                    ref={gridRef}
                    className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 stagger-children", gridVisible && "visible")}
                >
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.title} className="group">
                                <div className="flex items-start space-x-3 md:space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold mb-1 md:mb-2">{feature.title}</h3>
                                        <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
