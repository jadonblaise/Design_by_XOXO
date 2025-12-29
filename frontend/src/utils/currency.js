export const currencies = {
    USD: { symbol: '$', rate: 1, flag: '🇺🇸', name: 'US Dollar' },
    EUR: { symbol: '€', rate: 0.92, flag: '🇪🇺', name: 'Euro' },
    NGN: { symbol: '₦', rate: 1550, flag: '🇳🇬', name: 'Nigerian Naira' }
  };
  
  export const convertPrice = (price, currency = 'USD') => {
    const converted = price * currencies[currency].rate;
    return `${currencies[currency].symbol}${converted.toFixed(2)}`;
  };
  
  export const getCurrencySymbol = (currency = 'USD') => {
    return currencies[currency].symbol;
  };
  
  export const getCurrencyFlag = (currency = 'USD') => {
    return currencies[currency].flag;
  };