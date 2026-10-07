import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);
    const [titleRef, titleVisible] = useScrollAnimation();
    const [faqRef, faqVisible] = useScrollAnimation({ threshold: 0.1 });

    const faqs = [
        {
            question: 'What is Pulse?',
            answer: 'Pulse is a revenue and customer intelligence platform that helps growing businesses understand their performance through clear analytics and actionable insights.',
        },
        {
            question: 'Who is Pulse for?',
            answer: 'Pulse is built for growing businesses, startups, and scale-ups that need clear visibility into their revenue, customers, orders, and conversion metrics.',
        },
        {
            question: 'How quickly can I get started?',
            answer: 'Most teams are up and running within minutes. Connect your data sources, and Pulse will automatically organize your metrics and start generating insights.',
        },
        {
            question: 'Can I connect multiple data sources?',
            answer: 'Yes, Pulse integrates with popular platforms and tools. You can connect multiple data sources to get a complete view of your business.',
        },
        {
            question: 'Does Pulse support teams?',
            answer: 'Absolutely. All plans include team access, with the number of seats varying by plan. Growth and Scale plans support larger teams.',
        },
        {
            question: 'Can I export reports?',
            answer: 'Yes, you can export data and reports in multiple formats including CSV and PDF. Custom reporting is available on Growth and Scale plans.',
        },
        {
            question: 'Is there a free trial?',
            answer: 'Yes, all plans come with a 14-day free trial. No credit card required to start.',
        },
        {
            question: 'Can I cancel anytime?',
            answer: 'Yes, you can cancel your subscription at any time. Your data will remain accessible until the end of your billing period.',
        },
    ];

    return (
        <section id="faq" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-3xl mx-auto">
                <div
                    ref={titleRef}
                    className={cn("text-center mb-8 sm:mb-10 md:mb-12 fade-in-up", titleVisible && "visible")}
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 px-2">
                        Frequently asked questions
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-2">
                        Everything you need to know about Pulse.
                    </p>
                </div>

                <div
                    ref={faqRef}
                    className={cn("space-y-3 md:space-y-4 fade-in-up", faqVisible && "visible")}
                >
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border rounded-lg overflow-hidden bg-card"
                        >
                            <button
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            >
                                <span className="text-sm sm:text-base font-semibold pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={cn(
                                        'h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-transform flex-shrink-0',
                                        openIndex === index && 'transform rotate-180'
                                    )}
                                />
                            </button>
                            <div
                                className={cn(
                                    'overflow-hidden transition-all',
                                    openIndex === index ? 'max-h-96' : 'max-h-0'
                                )}
                            >
                                <p className="px-4 sm:px-6 pb-3 sm:pb-4 text-sm sm:text-base text-muted-foreground">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
