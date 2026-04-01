export function calculateEMI(principal: number, annualRate: number, tenureMonths: number): number {
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) return principal / tenureMonths;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

export function generateAmortization(
  principal: number,
  annualRate: number,
  tenureMonths: number
): Array<{ month: number; principal: number; interest: number; balance: number }> {
  const monthlyRate = annualRate / 12 / 100;
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const schedule = [];
  let balance = principal;

  for (let i = 1; i <= tenureMonths; i++) {
    const interest = Math.round(balance * monthlyRate);
    const principalPart = emi - interest;
    balance = Math.max(0, balance - principalPart);

    schedule.push({
      month: i,
      principal: principalPart,
      interest: interest,
      balance: Math.round(balance),
    });
  }

  return schedule;
}

export function getTotalInterest(principal: number, annualRate: number, tenureMonths: number): number {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  return Math.round(emi * tenureMonths - principal);
}

export function getTotalPayment(principal: number, annualRate: number, tenureMonths: number): number {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  return Math.round(emi * tenureMonths);
}
