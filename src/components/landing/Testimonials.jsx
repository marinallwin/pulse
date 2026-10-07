import { Card } from '../ui/Card';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

export function Testimonials() {
    const [titleRef, titleVisible] = useScrollAnimation();
    const [cardsRef, cardsVisible] = useScrollAnimation({ threshold: 0.1 });

    const testimonials = [
        {
            quote: "Pulse replaced three separate reports we were maintaining manually. Now we have everything in one place.",
            author: "Sarah Mitchell",
            role: "Head of Operations",
            company: "TechStart Inc",
        },
        {
            quote: "The revenue insights helped us identify our most valuable customer segments. We've focused our marketing accordingly.",
            author: "James Chen",
            role: "CEO",
            company: "DataFlow Solutions",
        },
        {
            quote: "We can finally see our conversion funnel clearly. The data is presented exactly how we need it.",
            author: "Emma Rodriguez",
            role: "Product Manager",
            company: "CloudScale Labs",
        },
    ];

    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div
                    ref={titleRef}
                    className={cn("text-center mb-8 sm:mb-12 md:mb-16 fade-in-up", titleVisible && "visible")}
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 px-2">
                        Trusted by growing teams
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                        See what our customers have to say about Pulse.
                    </p>
                </div>

                <div
                    ref={cardsRef}
                    className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 stagger-children", cardsVisible && "visible")}
                >
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.author} className="p-4 sm:p-5 md:p-6">
                            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">"{testimonial.quote}"</p>
                            <div>
                                <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs sm:text-sm font-semibold text-primary">
                                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm md:text-base font-semibold">{testimonial.author}</p>
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            {testimonial.role} at {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
