export function maskAccountNumber(accountNumber) {
  const last4Digits = accountNumber.slice(-4);
  return last4Digits.padStart(accountNumber.length, '*');
}
