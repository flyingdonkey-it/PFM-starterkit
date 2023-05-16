const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});

/**
 * Utility function for formatting a number (e.g. a bank balance) as currency
 * e.g. 123.45 will be formatted as $123.45
 */
export const formatCurrency = (value, removeDecimals = false) => {
  if (!removeDecimals) {
    return formatter.format(value);
  }

  return formatter.format(value).split('.')[0];
};
