// Owner screenshots of the Finance app. Drop PNGs with these exact names into
// public/screenshots/ and they replace the coded mock screens on the next build.
// The README has the capture guide for each one.
export const screenshots = {
  S1: { file: "finance-dashboard-mobile-dark.png", alt: "Finance dashboard showing ₹18,240 spent this month, safe to spend today, budgets and account balances" },
  S2: { file: "finance-dashboard-mobile-light.png", alt: "Finance dashboard in light mode with this month's spending, budgets and account balances" },
  S3: { file: "finance-dashboard-desktop-dark.png", alt: "Finance dashboard on a laptop with monthly totals, a category chart, a six-month trend and recent entries" },
  S4: { file: "finance-quick-add-mobile-dark.png", alt: "Quick add with ₹50 entered on the keypad and the Food category selected" },
  S5: { file: "finance-assistant-confirm-mobile-dark.png", alt: "The assistant showing a confirm card for a ₹50 chai expense with Confirm and Edit buttons" },
  S6: { file: "finance-friends-mobile-dark.png", alt: "Friends list showing Rohan owes you ₹450 and you owe Priya ₹1,200" },
  S7: { file: "finance-settle-up-desktop-dark.png", alt: "Settle up with Priya for ₹1,200, showing a UPI QR code and a Mark as paid button" },
  S8: { file: "finance-budgets-mobile-dark.png", alt: "Monthly budgets with progress bars and the amount left in each category" },
  S9: { file: "finance-goals-mobile-light.png", alt: "Savings goals with the Goa trip goal at ₹14,500 of ₹25,000" },
  S10: { file: "finance-reports-desktop-light.png", alt: "Monthly report comparing spending by category with the previous month" },
  S11: { file: "finance-paste-sms-mobile-dark.png", alt: "A pasted bank SMS filling a ₹340 Swiggy expense automatically" },
  S12: { file: "finance-transactions-mobile-light.png", alt: "Transactions grouped by day, with amounts, categories and accounts" },
} as const;
