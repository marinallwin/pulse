import { useQuery } from '@tanstack/react-query';
import { DollarSign, Users, TrendingUp, ShoppingCart } from 'lucide-react';
import { fetchDashboardKPIs, fetchRevenueData, fetchCustomerGrowthData } from '../../api/dashboardApi';
import { StatCard, StatCardSkeleton } from './StatCard';
import { RevenueChart, RevenueChartSkeleton } from './RevenueChart';
import { CustomerGrowthChart, CustomerGrowthChartSkeleton } from './CustomerGrowthChart';

export function DashboardOverview() {
    const { data: kpisData, isLoading: kpisLoading, error: kpisError } = useQuery({
        queryKey: ['dashboard-kpis'],
        queryFn: () => fetchDashboardKPIs(),
    });

    const { data: revenueData, isLoading: revenueLoading } = useQuery({
        queryKey: ['revenue-data'],
        queryFn: () => fetchRevenueData(),
    });

    const { data: customerData, isLoading: customerLoading } = useQuery({
        queryKey: ['customer-growth-data'],
        queryFn: () => fetchCustomerGrowthData(),
    });

    if (kpisError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                    <p className="text-muted-foreground mb-4">We couldn't load your dashboard data.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpisLoading ? (
                    <>
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                    </>
                ) : (
                    <>
                        <StatCard
                            title="Revenue"
                            value={kpisData.data.revenue.value}
                            change={kpisData.data.revenue.change}
                            format="currency"
                            icon={DollarSign}
                        />
                        <StatCard
                            title="Users"
                            value={kpisData.data.users.value}
                            change={kpisData.data.users.change}
                            format="number"
                            icon={Users}
                        />
                        <StatCard
                            title="Conversion"
                            value={kpisData.data.conversion.value}
                            change={kpisData.data.conversion.change}
                            format="percent"
                            icon={TrendingUp}
                        />
                        <StatCard
                            title="Orders"
                            value={kpisData.data.orders.value}
                            change={kpisData.data.orders.change}
                            format="number"
                            icon={ShoppingCart}
                        />
                    </>
                )}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {revenueLoading ? (
                    <RevenueChartSkeleton />
                ) : (
                    <RevenueChart data={revenueData.data} />
                )}

                {customerLoading ? (
                    <CustomerGrowthChartSkeleton />
                ) : (
                    <CustomerGrowthChart data={customerData.data} />
                )}
            </div>
        </div>
    );
}
