import { Card } from '../ui/Card';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

export function ProductShowcase() {
    const [titleRef, titleVisible] = useScrollAnimation();
    const [leftCardRef, leftCardVisible] = useScrollAnimation({ threshold: 0.2 });
    const [rightCardRef, rightCardVisible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <section id="product" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div
                    ref={titleRef}
                    className={cn("text-center mb-8 sm:mb-12 md:mb-16 fade-in-up", titleVisible && "visible")}
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 px-2">
                        Everything you need to understand your business
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                        Track the metrics that matter and make data-driven decisions with confidence.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <Card
                        ref={leftCardRef}
                        className={cn("p-4 sm:p-6 md:p-8 slide-in-left", leftCardVisible && "visible")}
                    >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">Real-time Performance</h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">
                            Monitor revenue, orders, and customer activity as it happens. No delays, no guesswork.
                        </p>
                        <div className="space-y-2 md:space-y-3">
                            {[
                                { label: 'Total Revenue', value: '$128,430', change: '+18.4%' },
                                { label: 'Active Orders', value: '8,421', change: '+9.2%' },
                                { label: 'New Customers', value: '1,247', change: '+12.8%' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-2 sm:p-3 bg-background rounded-lg border">
                                    <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                                    <div className="text-right">
                                        <p className="text-sm sm:text-base font-bold">{item.value}</p>
                                        <p className="text-xs text-success">{item.change}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card
                        ref={rightCardRef}
                        className={cn("p-4 sm:p-6 md:p-8 slide-in-right", rightCardVisible && "visible")}
                    >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">Customer Intelligence</h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">
                            Understand who your customers are, what they buy, and how they engage with your business.
                        </p>
                        <div className="space-y-3 md:space-y-4">
                            <div className="p-3 md:p-4 bg-background rounded-lg border">
                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                    <span className="text-xs sm:text-sm font-medium">Customer Lifetime Value</span>
                                    <span className="text-xs sm:text-sm font-bold">$2,847</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }} />
                                </div>
                            </div>
                            <div className="p-3 md:p-4 bg-background rounded-lg border">
                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                    <span className="text-xs sm:text-sm font-medium">Average Order Value</span>
                                    <span className="text-xs sm:text-sm font-bold">$341</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '82%' }} />
                                </div>
                            </div>
                            <div className="p-3 md:p-4 bg-background rounded-lg border">
                                <div className="flex items-center justify-between mb-2 md:mb-3">
                                    <span className="text-xs sm:text-sm font-medium">Repeat Customer Rate</span>
                                    <span className="text-xs sm:text-sm font-bold">42%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }} />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
