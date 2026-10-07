import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { formatCurrency } from '../../lib/utils';

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 sm:p-3 shadow-md">
                <p className="text-xs sm:text-sm font-medium">{formatCurrency(payload[0].value)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                    {new Date(payload[0].payload.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
                </p>
            </div>
        );
    }
    return null;
}

export function RevenueChart({ data }) {
    return (
        <Card>
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl">Revenue Overview</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Daily revenue performance</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
                <ResponsiveContainer width="100%" height={200} className="sm:!h-[250px] md:!h-[300px]">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(262 83% 58%)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(262 83% 58%)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.5} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            className="text-[10px] sm:text-xs"
                            stroke="hsl(var(--muted-foreground))"
                            tick={{ fontSize: 10 }}
                        />
                        <YAxis
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            className="text-[10px] sm:text-xs"
                            stroke="hsl(var(--muted-foreground))"
                            tick={{ fontSize: 10 }}
                            width={35}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="hsl(262 83% 58%)"
                            strokeWidth={2}
                            fill="url(#revenueGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function RevenueChartSkeleton() {
    return (
        <Card>
            <CardHeader className="p-4 sm:p-6">
                <div className="h-5 w-32 sm:h-6 sm:w-40 bg-muted rounded animate-pulse" />
                <div className="h-3 w-36 sm:h-4 sm:w-48 bg-muted rounded animate-pulse mt-2" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
                <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full bg-muted rounded animate-pulse" />
            </CardContent>
        </Card>
    );
}
