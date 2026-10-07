import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

export function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState('monthly');
    const [titleRef, titleVisible] = useScrollAnimation();
    const [cardsRef, cardsVisible] = useScrollAnimation({ threshold: 0.1 });

    const plans = [
        {
            name: 'Starter',
            description: 'For individuals and small teams',
            monthlyPrice: 49,
            yearlyPrice: 39,
            features: [
                'Up to 10,000 orders/month',
                'Basic analytics',
                '30-day data retention',
                'Email support',
                '1 team member',
            ],
        },
        {
            name: 'Growth',
            description: 'For growing businesses',
            monthlyPrice: 149,
            yearlyPrice: 119,
            featured: true,
            features: [
                'Up to 100,000 orders/month',
                'Advanced analytics',
                '1-year data retention',
                'Priority support',
                'Up to 10 team members',
                'Custom reports',
            ],
        },
        {
            name: 'Scale',
            description: 'For larger teams',
            monthlyPrice: 399,
            yearlyPrice: 319,
            features: [
                'Unlimited orders',
                'Advanced analytics',
                'Unlimited data retention',
                'Dedicated support',
                'Unlimited team members',
                'Custom reports',
                'API access',
                'SSO',
            ],
        },
    ];

    const getPrice = (plan) => {
        return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    };

    return (
        <section id="pricing" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div
                    ref={titleRef}
                    className={cn("text-center mb-8 sm:mb-10 md:mb-12 fade-in-up", titleVisible && "visible")}
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 px-2">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-2">
                        Choose the plan that fits your business size and needs.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center rounded-lg border bg-background p-1">
                        <button
                            className={cn(
                                'px-3 sm:px-4 md:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer',
                                billingPeriod === 'monthly' ? 'bg-primary text-white' : 'text-muted-foreground'
                            )}
                            onClick={() => setBillingPeriod('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={cn(
                                'px-3 sm:px-4 md:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer',
                                billingPeriod === 'yearly' ? 'bg-primary text-white' : 'text-muted-foreground'
                            )}
                            onClick={() => setBillingPeriod('yearly')}
                        >
                            Yearly <span className="text-xs ml-1 hidden sm:inline">(Save 20%)</span>
                        </button>
                    </div>
                </div>

                <div
                    ref={cardsRef}
                    className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 stagger-children", cardsVisible && "visible")}
                >
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={cn(
                                'p-4 sm:p-6 md:p-8',
                                plan.featured && 'border-primary border-2 relative'
                            )}
                        >
                            {plan.featured && (
                                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{plan.name}</h3>
                                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{plan.description}</p>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-baseline">
                                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">${getPrice(plan)}</span>
                                    <span className="text-xs sm:text-sm md:text-base text-muted-foreground ml-2">/month</span>
                                </div>
                                {billingPeriod === 'yearly' && (
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                        Billed annually at ${getPrice(plan) * 12}
                                    </p>
                                )}
                            </div>

                            <a href="/dashboard" className="block mb-4 sm:mb-6">
                                <Button
                                    variant={plan.featured ? 'primary' : 'outline'}
                                    className="w-full text-xs sm:text-sm md:text-base"
                                >
                                    Get Started
                                </Button>
                            </a>

                            <ul className="space-y-2 sm:space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-success mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-xs sm:text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
