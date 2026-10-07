import { kpis, revenueData, customerGrowthData } from '../data/mockData';

const NETWORK_DELAY = 800;

function simulateNetworkDelay() {
  return new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));
}

export async function fetchDashboardKPIs(dateRange = 'last30days') {
  await simulateNetworkDelay();
  
  return {
    data: kpis,
    dateRange,
  };
}

export async function fetchRevenueData(dateRange = 'last30days') {
  await simulateNetworkDelay();
  
  let data = revenueData;
  
  if (dateRange === 'last7days') {
    data = revenueData.slice(-7);
  } else if (dateRange === 'last30days') {
    data = revenueData.slice(-30);
  } else if (dateRange === 'last90days') {
    data = revenueData;
  }
  
  return { data };
}

export async function fetchCustomerGrowthData(dateRange = 'last30days') {
  await simulateNetworkDelay();
  
  let data = customerGrowthData;
  
  if (dateRange === 'last7days') {
    data = customerGrowthData.slice(-7);
  } else if (dateRange === 'last30days') {
    data = customerGrowthData.slice(-30);
  } else if (dateRange === 'last90days') {
    data = customerGrowthData;
  }
  
  return { data };
}
