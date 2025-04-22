
export const formatINRCurrency = (value) => 
  value ? new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0 
  }).format(Number(value)) : '₹0';
