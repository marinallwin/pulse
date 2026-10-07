import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchTransactions } from '../../api/transactionsApi';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency, formatDate } from '../../lib/utils';
import { useDebounce } from '../../hooks/useDebounce';

export function TransactionsView() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const debouncedSearch = useDebounce(search, 300);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['transactions', page, debouncedSearch, status],
        queryFn: () => fetchTransactions({ page, search: debouncedSearch, status, limit: 10 }),
    });

    const getStatusVariant = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'pending': return 'warning';
            case 'failed': return 'error';
            case 'refunded': return 'secondary';
            default: return 'default';
        }
    };

    if (error) {
        return (
            <Card className="p-6 sm:p-8">
                <div className="text-center">
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Something went wrong</h3>
                    <p className="text-sm text-muted-foreground mb-4">We couldn't load your transaction data.</p>
                    <Button onClick={() => refetch()}>Try again</Button>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">Transactions</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Manage and track your transaction history</p>
            </div>

            <Card className="p-3 sm:p-4 md:p-6">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search transactions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-8 sm:pl-9 text-xs sm:text-sm h-9 sm:h-10"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="h-9 sm:h-10 px-2 sm:px-3 rounded-md border border-input bg-background text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6">
                    {isLoading ? (
                        <div className="space-y-3 px-3 sm:px-4 md:px-6">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-12 sm:h-16 bg-muted rounded animate-pulse" />
                            ))}
                        </div>
                    ) : data?.data.length === 0 ? (
                        <div className="text-center py-8 sm:py-12 px-3 sm:px-4 md:px-6">
                            <p className="text-sm sm:text-base text-muted-foreground mb-2">No transactions found</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Try changing your search or filters.</p>
                            <Button
                                variant="outline"
                                className="mt-4 text-xs sm:text-sm"
                                onClick={() => {
                                    setSearch('');
                                    setStatus('all');
                                }}
                            >
                                Clear filters
                            </Button>
                        </div>
                    ) : (
                        <table className="w-full min-w-[640px]">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">ID</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">Customer</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">Amount</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">Date</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-muted-foreground">Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data.map((transaction) => (
                                    <tr key={transaction.id} className="border-b hover:bg-muted/50">
                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-mono">{transaction.id}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{transaction.customerName}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">{formatCurrency(transaction.amount)}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                                            <Badge variant={getStatusVariant(transaction.status)} className="text-[10px] sm:text-xs">
                                                {transaction.status}
                                            </Badge>
                                        </td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground">
                                            {formatDate(transaction.date)}
                                        </td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground">
                                            {transaction.paymentMethod}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                {data && data.pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Page {data.pagination.page} of {data.pagination.totalPages}
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="text-xs sm:text-sm"
                            >
                                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                                disabled={page === data.pagination.totalPages}
                                className="text-xs sm:text-sm"
                            >
                                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
