// Generate realistic mock data for Pulse

const CUSTOMER_NAMES = [
  'Sarah Mitchell', 'James Chen', 'Emma Rodriguez', 'Michael Johnson',
  'Olivia Brown', 'William Davis', 'Sophia Martinez', 'Robert Wilson',
  'Ava Anderson', 'David Thompson', 'Isabella Garcia', 'Joseph Lee',
  'Mia Taylor', 'Charles White', 'Charlotte Harris', 'Daniel Clark',
  'Amelia Lewis', 'Thomas Walker', 'Harper Robinson', 'Christopher Young'
];

const COMPANIES = [
  'TechStart Inc', 'DataFlow Solutions', 'CloudScale Labs', 'BuildRight Co',
  'FastTrack Systems', 'NextGen Analytics', 'PrimeVentures', 'CoreSync Tech',
  'Velocity Apps', 'Summit Digital', 'Horizon Solutions', 'Cascade Networks',
  'Phoenix Systems', 'Quantum Labs', 'Stellar Tech', 'Nova Innovations',
  'Apex Ventures', 'Pulse Commerce', 'Vertex Solutions', 'Atlas Group'
];

const PAYMENT_METHODS = ['Credit Card', 'PayPal', 'Bank Transfer', 'Debit Card'];
const STATUSES = ['completed', 'pending', 'failed', 'refunded'];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTransactionId() {
  return 'TX' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateEmail(name) {
  return name.toLowerCase().replace(' ', '.') + '@example.com';
}

export const customers = CUSTOMER_NAMES.map((name, index) => {
  const orderCount = Math.floor(Math.random() * 15) + 1;
  const totalSpend = Math.floor(Math.random() * 50000) + 5000;
  const lastActive = randomDate(new Date(2026, 0, 1), new Date(2026, 9, 6));
  
  return {
    id: `CUST${String(index + 1).padStart(4, '0')}`,
    name,
    email: generateEmail(name),
    company: randomElement(COMPANIES),
    orders: orderCount,
    totalSpend,
    status: Math.random() > 0.1 ? 'active' : 'inactive',
    lastActive: lastActive.toISOString(),
    joinedDate: randomDate(new Date(2024, 0, 1), new Date(2026, 0, 1)).toISOString(),
  };
});

export const transactions = [];
let transactionCounter = 0;

customers.forEach(customer => {
  const numTransactions = Math.max(1, Math.floor(customer.orders * 1.2));
  
  for (let i = 0; i < numTransactions; i++) {
    const amount = Math.floor(Math.random() * 5000) + 100;
    const date = randomDate(new Date(2026, 6, 1), new Date(2026, 9, 6));
    const status = i === 0 && Math.random() > 0.85 ? randomElement(['pending', 'failed']) : 'completed';
    
    transactions.push({
      id: generateTransactionId(),
      customerId: customer.id,
      customerName: customer.name,
      amount,
      status,
      date: date.toISOString(),
      paymentMethod: randomElement(PAYMENT_METHODS),
    });
    
    transactionCounter++;
  }
});

transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

export const revenueData = [];
const today = new Date(2026, 9, 6);

for (let i = 89; i >= 0; i--) {
  const date = new Date(today);
  date.setDate(date.getDate() - i);
  
  const dayTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    return tDate.toDateString() === date.toDateString() && t.status === 'completed';
  });
  
  const revenue = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  revenueData.push({
    date: date.toISOString().split('T')[0],
    revenue,
    orders: dayTransactions.length,
  });
}

export const customerGrowthData = [];
let cumulativeCustomers = 0;

for (let i = 89; i >= 0; i--) {
  const date = new Date(today);
  date.setDate(date.getDate() - i);
  
  const newCustomers = customers.filter(c => {
    const joinDate = new Date(c.joinedDate);
    return joinDate.toDateString() === date.toDateString();
  }).length;
  
  cumulativeCustomers += newCustomers;
  
  customerGrowthData.push({
    date: date.toISOString().split('T')[0],
    customers: cumulativeCustomers,
    newCustomers,
  });
}

const last30Days = new Date(today);
last30Days.setDate(last30Days.getDate() - 30);

const last60Days = new Date(today);
last60Days.setDate(last60Days.getDate() - 60);

const currentPeriodTransactions = transactions.filter(t => 
  new Date(t.date) >= last30Days && t.status === 'completed'
);

const previousPeriodTransactions = transactions.filter(t => {
  const date = new Date(t.date);
  return date >= last60Days && date < last30Days && t.status === 'completed';
});

const currentRevenue = currentPeriodTransactions.reduce((sum, t) => sum + t.amount, 0);
const previousRevenue = previousPeriodTransactions.reduce((sum, t) => sum + t.amount, 0);
const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

const currentOrders = currentPeriodTransactions.length;
const previousOrders = previousPeriodTransactions.length;
const ordersChange = ((currentOrders - previousOrders) / previousOrders) * 100;

const currentCustomers = customers.filter(c => new Date(c.joinedDate) >= last30Days).length;
const previousCustomers = customers.filter(c => {
  const date = new Date(c.joinedDate);
  return date >= last60Days && date < last30Days;
}).length;
const customersChange = ((currentCustomers - previousCustomers) / Math.max(previousCustomers, 1)) * 100;

const currentConversion = 4.82;
const previousConversion = 4.18;
const conversionChange = currentConversion - previousConversion;

export const kpis = {
  revenue: {
    value: currentRevenue,
    change: revenueChange,
    previous: previousRevenue,
  },
  users: {
    value: customers.length,
    change: customersChange,
    previous: customers.length - currentCustomers,
  },
  conversion: {
    value: currentConversion,
    change: conversionChange,
    previous: previousConversion,
  },
  orders: {
    value: currentOrders,
    change: ordersChange,
    previous: previousOrders,
  },
};
