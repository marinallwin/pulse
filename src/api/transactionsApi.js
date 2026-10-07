import { transactions } from '../data/mockData';

const NETWORK_DELAY = 600;

function simulateNetworkDelay() {
  return new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));
}

export async function fetchTransactions({ 
  page = 1, 
  limit = 10, 
  search = '', 
  status = 'all',
  sortBy = 'date',
  sortOrder = 'desc'
}) {
  await simulateNetworkDelay();
  
  let filtered = [...transactions];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(t => 
      t.id.toLowerCase().includes(searchLower) ||
      t.customerName.toLowerCase().includes(searchLower)
    );
  }
  
  if (status !== 'all') {
    filtered = filtered.filter(t => t.status === status);
  }
  
  filtered.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortBy === 'date') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginated = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginated,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}

export async function fetchTransactionById(id) {
  await simulateNetworkDelay();
  
  const transaction = transactions.find(t => t.id === id);
  
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  
  return { data: transaction };
}
