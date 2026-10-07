// Home page FAQ. The same text feeds the FAQPage structured data.
export type FaqItem = { question: string; answer: string; link?: { href: string; label: string } };

export const faq: FaqItem[] = [
  {
    question: "Is Finance free?",
    answer:
      "Yes. Finance is free while we are in early access. If we add paid features later, we will tell you well in advance.",
  },
  {
    question: "Do I need to connect my bank?",
    answer:
      "No. Finance never asks for bank logins and never reads your SMS inbox. You add entries by typing, speaking, pasting a bank SMS or importing a CSV.",
  },
  {
    question: "Can the AI change my data by itself?",
    answer:
      "No. Every add, change or delete the assistant suggests appears as a card you can edit, and nothing is saved until you tap Confirm.",
  },
  {
    question: "Which languages does it understand?",
    answer:
      "The assistant understands English, Hindi and Hinglish, typed or spoken. The app's screens are in English.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Finance runs in your phone's browser and you can add it to your home screen, where it opens like an app. There is no App Store or Play Store app yet.",
  },
  {
    question: "How does settling up work?",
    answer:
      "When a friend has added their UPI ID, Settle up opens your own UPI app with the exact amount (or shows a QR code on a laptop). You pay in your UPI app, then tap Mark as paid. We never handle the money.",
  },
  {
    question: "Who can see my data?",
    answer:
      "Only you. If you join a group, its members see that group's shared expenses, your name, your balance with them and your UPI ID if you added one.",
  },
  {
    question: "What happens if the AI service is down?",
    answer:
      "Simple entries like “₹120 uber yesterday” still work through a built-in parser that runs without any AI service. Questions about your spending need the AI and will work again once it is back.",
  },
  {
    question: "Can I bring my Google Sheet?",
    answer:
      "Yes. Export it as CSV and import it in Finance. You can export your transactions back to CSV any time.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to Settings, choose Delete account and type your email to confirm. You have 30 days to change your mind by logging in. After that, your data is permanently deleted.",
    link: { href: "/delete-account", label: "How account deletion works" },
  },
];
