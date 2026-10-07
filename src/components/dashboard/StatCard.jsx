import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn, formatCurrency, formatNumber, formatPercent } from '../../lib/utils';

export function StatCard({ title, value, change, format = 'number', icon: Icon }) {
    const isPositive = change >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    const formatValue = () => {
        if (format === 'currency') return formatCurrency(value);
        if (format === 'percent') return `${value.toFixed(2)}%`;
        return formatNumber(value);
    };

    return (
        <Card className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
                {Icon && <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />}
            </div>
            <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{formatValue()}</p>
                <div className="flex items-center gap-1">
                    <TrendIcon
                        className={cn(
                            'h-3 w-3 sm:h-4 sm:w-4',
                            isPositive ? 'text-success' : 'text-error'
                        )}
                    />
                    <span className={cn(
                        'text-xs sm:text-sm font-medium',
                        isPositive ? 'text-success' : 'text-error'
                    )}>
                        {formatPercent(change)}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                        vs previous period
                    </span>
                </div>
            </div>
        </Card>
    );
}

export function StatCardSkeleton() {
    return (
        <Card className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="h-3 w-20 sm:h-4 sm:w-24 bg-muted rounded animate-pulse" />
                <div className="h-3 w-3 sm:h-4 sm:w-4 bg-muted rounded animate-pulse" />
            </div>
            <div>
                <div className="h-7 w-24 sm:h-8 sm:w-28 md:h-9 md:w-32 bg-muted rounded animate-pulse mb-1 sm:mb-2" />
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 sm:h-4 sm:w-4 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 sm:h-4 sm:w-20 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-24 sm:h-4 sm:w-32 bg-muted rounded animate-pulse ml-1" />
                </div>
            </div>
        </Card>
    );
}
