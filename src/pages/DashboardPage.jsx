import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { TransactionsView } from '../components/dashboard/TransactionsView';
import { CustomersView } from '../components/dashboard/CustomersView';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function DashboardContent() {
    const [currentView, setCurrentView] = useState('overview');

    const renderView = () => {
        switch (currentView) {
            case 'overview':
                return <DashboardOverview />;
            case 'transactions':
                return <TransactionsView />;
            case 'customers':
                return <CustomersView />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
            {renderView()}
        </DashboardLayout>
    );
}

export function DashboardPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardContent />
        </QueryClientProvider>
    );
}
