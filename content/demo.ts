// Fictional demo values shared by every mock screen on the site.
export const demo = {
  user: "Aarav",
  upiId: "aarav@okbank",
  month: { spent: 18240, income: 62000, lastMonthSpent: 19870 },
  budgets: [
    { name: "Food", emoji: "🍜", spent: 5700, limit: 8000 },
    { name: "Travel", emoji: "🚕", spent: 2100, limit: 3000 },
    { name: "Fun", emoji: "🎬", spent: 1100, limit: 2000 },
  ],
  accounts: [
    { name: "SBI", type: "Bank", balance: 48310 },
    { name: "Cash", type: "Cash", balance: 1250 },
    { name: "Paytm wallet", type: "Wallet", balance: 640 },
  ],
  friends: [
    { name: "Rohan", amount: 450, direction: "owes-you" as const },
    { name: "Priya", amount: 1200, direction: "you-owe" as const },
    { name: "Kabir", amount: 0, direction: "settled" as const },
  ],
  group: "Flat 4B",
  goal: { name: "Goa trip", saved: 14500, target: 25000, by: "December" },
  streak: 12,
  categories: [
    { name: "Rent", amount: 9000, color: "var(--primary)" },
    { name: "Food", amount: 5700, color: "var(--accent)" },
    { name: "Travel", amount: 2100, color: "var(--warning)" },
    { name: "Other", amount: 1440, color: "var(--success)" },
  ],
  trend: [16400, 17950, 15800, 21300, 19870, 18240],
  trendMonths: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  transactions: [
    { day: "Today", items: [
      { title: "Chai", category: "Food", emoji: "🍜", account: "Cash", amount: -50 },
      { title: "Uber to office", category: "Travel", emoji: "🚕", account: "SBI", amount: -120 },
    ] },
    { day: "Yesterday", items: [
      { title: "Swiggy dinner", category: "Food", emoji: "🍜", account: "SBI", amount: -340 },
      { title: "Kabir paid you back", category: "Settle up", emoji: "🤝", account: "SBI", amount: 450 },
      { title: "Groceries, Flat 4B", category: "Food", emoji: "🍜", account: "Paytm wallet", amount: -620 },
    ] },
    { day: "1 Oct", items: [
      { title: "Salary", category: "Salary", emoji: "💼", account: "SBI", amount: 62000 },
      { title: "Rent share, Flat 4B", category: "Rent", emoji: "🏠", account: "SBI", amount: -9000 },
    ] },
  ],
};
