import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { formatNumber } from '../../lib/utils';

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 sm:p-3 shadow-md">
                <p className="text-xs sm:text-sm font-medium">{formatNumber(payload[0].value)} customers</p>
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

export function CustomerGrowthChart({ data }) {
    return (
        <Card>
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl">Customer Growth</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Cumulative customer count over time</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
                <ResponsiveContainer width="100%" height={200} className="sm:!h-[250px] md:!h-[300px]">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.5} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            className="text-[10px] sm:text-xs"
                            stroke="hsl(var(--muted-foreground))"
                            tick={{ fontSize: 10 }}
                        />
                        <YAxis
                            tickFormatter={(value) => formatNumber(value)}
                            className="text-[10px] sm:text-xs"
                            stroke="hsl(var(--muted-foreground))"
                            tick={{ fontSize: 10 }}
                            width={35}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="customers"
                            stroke="hsl(262 83% 58%)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function CustomerGrowthChartSkeleton() {
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
