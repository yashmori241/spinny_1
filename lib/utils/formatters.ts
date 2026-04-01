export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatPriceShort(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(1)} Cr`;
  }
  if (price >= 100000) {
    return `${(price / 100000).toFixed(1)} L`;
  }
  return price.toLocaleString('en-IN');
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

export function formatMileage(km: number): string {
  if (km >= 100000) {
    return `${(km / 100000).toFixed(1)} L km`;
  }
  return `${km.toLocaleString('en-IN')} km`;
}

export function formatEMI(emi: number): string {
  return `₹${emi.toLocaleString('en-IN')}/mo`;
}

export function getDiscountPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
