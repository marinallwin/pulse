import { customers } from '../data/mockData';

const NETWORK_DELAY = 600;

function simulateNetworkDelay() {
  return new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));
}

export async function fetchCustomers({ 
  page = 1, 
  limit = 10, 
  search = '', 
  status = 'all',
  sortBy = 'totalSpend',
  sortOrder = 'desc'
}) {
  await simulateNetworkDelay();
  
  let filtered = [...customers];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(searchLower) ||
      c.email.toLowerCase().includes(searchLower) ||
      c.company.toLowerCase().includes(searchLower)
    );
  }
  
  if (status !== 'all') {
    filtered = filtered.filter(c => c.status === status);
  }
  
  filtered.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortBy === 'lastActive') {
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

export async function fetchCustomerById(id) {
  await simulateNetworkDelay();
  
  const customer = customers.find(c => c.id === id);
  
  if (!customer) {
    throw new Error('Customer not found');
  }
  
  return { data: customer };
}
