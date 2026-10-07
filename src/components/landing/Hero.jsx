import { ArrowRight, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

export function Hero() {
    const [heroRef, heroVisible] = useScrollAnimation();
    const [dashboardRef, dashboardVisible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <section className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-16 sm:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                <div
                    ref={heroRef}
                    className={cn("text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 fade-in-up", heroVisible && "visible")}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-balance mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight px-2">
                        Know where your business stands.
                        <br />
                        <span className="text-primary">Know where it's going.</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground text-balance max-w-2xl lg:max-w-3xl mx-auto mb-4 sm:mb-5 md:mb-6 lg:mb-8 px-2">
                        Pulse brings revenue, customer, order, and conversion data into one focused analytics workspace.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center px-2">
                        <a href="/dashboard" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto text-sm md:text-base">
                                Start for free <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </a>
                        <a href="#product" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm md:text-base">
                                Explore dashboard
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div
                    ref={dashboardRef}
                    className={cn("relative scale-in max-w-5xl lg:max-w-6xl mx-auto", dashboardVisible && "visible")}
                >
                    <div className="absolute -inset-1 sm:-inset-2 md:-inset-3 lg:-inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl md:rounded-2xl lg:rounded-3xl blur-xl md:blur-2xl lg:blur-3xl" />
                    <Card className="relative overflow-hidden">
                        <div className="p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 bg-gradient-to-br from-background to-muted/30">
                            {/* Mock Dashboard UI */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
                                <div className="bg-background rounded-md md:rounded-lg p-2 sm:p-2.5 md:p-3 lg:p-4 border">
                                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                                        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Revenue</p>
                                        <BarChart3 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">$128,430</p>
                                    <p className="text-[9px] sm:text-[10px] md:text-xs text-success mt-0.5">+18.4% vs last period</p>
                                </div>
                                <div className="bg-background rounded-md md:rounded-lg p-2 sm:p-2.5 md:p-3 lg:p-4 border">
                                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                                        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Customers</p>
                                        <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">24,892</p>
                                    <p className="text-[9px] sm:text-[10px] md:text-xs text-success mt-0.5">+12.8% vs last period</p>
                                </div>
                                <div className="bg-background rounded-md md:rounded-lg p-2 sm:p-2.5 md:p-3 lg:p-4 border sm:col-span-1">
                                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                                        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Conversion</p>
                                        <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">4.82%</p>
                                    <p className="text-[9px] sm:text-[10px] md:text-xs text-success mt-0.5">+0.64% vs last period</p>
                                </div>
                            </div>

                            {/* Mock Chart */}
                            <div className="bg-background rounded-md md:rounded-lg p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-6 border">
                                <div className="flex items-center justify-between mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
                                    <div>
                                        <h3 className="text-xs sm:text-sm md:text-base font-semibold">Revenue Overview</h3>
                                        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground hidden sm:block">Daily revenue performance</p>
                                    </div>
                                </div>
                                <div className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-40 flex items-end gap-0.5 sm:gap-1 md:gap-1.5">
                                    {Array.from({ length: 30 }).map((_, i) => {
                                        const height = Math.random() * 100;
                                        return (
                                            <div
                                                key={i}
                                                className="flex-1 bg-primary/20 rounded-t hover:bg-primary/30 transition-colors cursor-pointer"
                                                style={{ height: `${height}%`, minHeight: '20%' }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
