// Home page copy that is not the FAQ. Edit freely; keep the copy rules in the README.

export const hero = {
  overline: "Finance is live",
  title: "AI agents that keep track for you.",
  subhead:
    "Tell an agent what happened, in a sentence or out loud. It does the bookkeeping and asks before it saves anything. Our first agent runs your money.",
  note: "Free during early access. No bank login needed.",
};

export const steps = [
  {
    title: "Say what happened.",
    body: "Type or say “₹50 chai today”. Hindi and Hinglish work too, like “chai pe 50 kharcha”.",
  },
  {
    title: "Check the card.",
    body: "The agent fills in the amount, category, account and date. Nothing is saved until you tap Confirm, and you can change any field first.",
  },
  {
    title: "See it everywhere.",
    body: "Your budget, balance and monthly report update at once.",
  },
];

export const highlights = [
  {
    key: "talk",
    title: "Talk to your money",
    body: "Ask “How much did I spend on travel in August?” or say “Split ₹1,200 dinner in Flat 4B”. The assistant answers from your real numbers and asks before it changes anything.",
    large: true,
  },
  {
    key: "upi",
    title: "Settle up by UPI",
    body: "See who owes whom across every group. One tap opens your own UPI app with the exact amount, or shows a QR code on a laptop. Money never passes through us.",
    large: true,
  },
  {
    key: "sms",
    title: "Paste a bank SMS",
    body: "Copy the debit SMS from your bank and paste it. The entry fills itself. Your inbox stays private.",
  },
  {
    key: "budget",
    title: "Budgets that tell you today's number",
    body: "Set a monthly limit per category and see what you can safely spend today.",
  },
  {
    key: "recurring",
    title: "Rent and EMIs on autopilot",
    body: "Recurring entries post themselves on their day, and upcoming bills show up before they are due.",
  },
  {
    key: "data",
    title: "Your data, your exit",
    body: "Import your old Google Sheet from CSV, export everything any time, and delete your account whenever you want.",
  },
] as const;

export const trust = [
  {
    title: "No bank login, ever.",
    body: "We never ask for bank passwords, card numbers or your UPI PIN. You type or paste what you spent.",
  },
  {
    title: "Nothing saved without your tap.",
    body: "The AI proposes. You confirm. It cannot change your records on its own.",
  },
  {
    title: "Private by default.",
    body: "Only you see your entries. Friends see only what you share in a group.",
  },
  {
    title: "Leave whenever you like.",
    body: "Export your transactions as CSV. Delete your account in Settings, with 30 days to change your mind.",
  },
];
