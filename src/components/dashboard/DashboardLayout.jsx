import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, CreditCard, Users, Bell, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn, getGreeting } from '../../lib/utils';

export function DashboardLayout({ children, currentView, onViewChange }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dateRange, setDateRange] = useState('last30days');
    const navigate = useNavigate();

    const navigation = [
        { id: 'overview', name: 'Overview', icon: LayoutDashboard },
        { id: 'transactions', name: 'Transactions', icon: CreditCard },
        { id: 'customers', name: 'Customers', icon: Users },
    ];

    const dateRanges = [
        { value: 'last7days', label: 'Last 7 days' },
        { value: 'last30days', label: 'Last 30 days' },
        { value: 'last90days', label: 'Last 90 days' },
        { value: 'thisyear', label: 'This year' },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Full screen on mobile */}
            <aside
                className={cn(
                    'fixed top-0 left-0 z-50 h-full bg-card border-r border-border transition-transform lg:translate-x-0',
                    'w-full sm:w-64',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-base sm:text-lg">P</span>
                        </div>
                        <span className="text-lg sm:text-xl font-bold">Pulse</span>
                    </button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="p-3 sm:p-4 space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onViewChange(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={cn(
                                    'w-full flex items-center space-x-2.5 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer',
                                    currentView === item.id
                                        ? 'bg-primary text-white'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-6">
                        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="lg:hidden flex-shrink-0"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold truncate">{getGreeting()}, Alex</h1>
                                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block truncate">Here's what's happening with your business</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                            <div className="relative hidden md:block">
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="appearance-none h-9 sm:h-10 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-lg border border-input bg-background text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                                >
                                    {dateRanges.map((range) => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground pointer-events-none" />
                            </div>

                            <Button variant="ghost" size="sm" className="relative p-2">
                                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-error rounded-full" />
                            </Button>

                            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary flex items-center justify-center cursor-pointer flex-shrink-0">
                                <span className="text-xs sm:text-sm font-semibold text-white">A</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-3 sm:p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
