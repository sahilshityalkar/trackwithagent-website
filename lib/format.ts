const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

/** ₹1,25,000 style, with Indian lakh grouping and no decimals unless needed. */
export function formatINR(amount: number) {
  return `₹${inr.format(amount)}`;
}
