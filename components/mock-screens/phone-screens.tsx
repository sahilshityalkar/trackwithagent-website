import { Check, ChevronLeft, Delete, Flame, MessageSquareText, Plus } from "lucide-react";
import { demo } from "@/content/demo";
import { formatINR } from "@/lib/format";
import { AppBar, Meter, MockCard, Money, PhoneScreen } from "./parts";

const pct = (a: number, b: number) => Math.round((a / b) * 100);

export function DashboardMock() {
  const { month } = demo;
  const change = pct(month.lastMonthSpent - month.spent, month.lastMonthSpent);
  return (
    <PhoneScreen nav="home">
      <AppBar
        title={`Hi, ${demo.user}`}
        right={
          <span className="flex items-center gap-1 rounded-full bg-surface-3 px-2 py-0.5 text-[10px] font-semibold">
            <Flame className="size-3 text-warning" /> {demo.streak} days
          </span>
        }
      />
      <div className="flex flex-col gap-2.5 px-3 pb-3 text-[11px]">
        <div className="rounded-2xl bg-gradient-hero p-3.5 text-white">
          <p className="text-[10px] font-medium text-white/80">Spent in October</p>
          <p className="mt-0.5 font-display text-[26px] font-bold leading-tight tabular">{formatINR(month.spent)}</p>
          <p className="mt-1 text-white/85">
            Income <Money value={month.income} /> · Net <Money value={month.income - month.spent} />
          </p>
          <p className="mt-2 inline-flex rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">{change}% less than September</p>
        </div>
        <MockCard className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Safe to spend today</p>
            <p className="font-display text-[18px] font-bold tabular">₹410</p>
          </div>
          <span className="rounded-full bg-primary-soft px-2 py-1 text-[10px] font-semibold text-primary">On track</span>
        </MockCard>
        <MockCard>
          <p className="mb-2 font-semibold">Budgets</p>
          {demo.budgets.slice(0, 2).map((budget) => (
            <div key={budget.name} className="mb-2 last:mb-0">
              <div className="mb-1 flex justify-between">
                <span>
                  {budget.emoji} {budget.name}
                </span>
                <span className="text-muted-foreground tabular">
                  {formatINR(budget.spent)} of {formatINR(budget.limit)}
                </span>
              </div>
              <Meter value={budget.spent / budget.limit} />
            </div>
          ))}
        </MockCard>
        <div className="grid grid-cols-3 gap-2">
          {demo.accounts.map((account) => (
            <MockCard key={account.name} className="p-2">
              <p className="truncate text-[9.5px] text-muted-foreground">{account.name}</p>
              <p className="font-semibold tabular">{formatINR(account.balance)}</p>
            </MockCard>
          ))}
        </div>
      </div>
    </PhoneScreen>
  );
}

export function QuickAddMock() {
  const categories = [
    ["🍜", "Food"],
    ["🚕", "Travel"],
    ["🛒", "Groceries"],
    ["🛍️", "Shopping"],
    ["🏠", "Rent"],
    ["💡", "Bills"],
    ["🎬", "Fun"],
    ["💊", "Health"],
  ];
  return (
    <PhoneScreen nav={false}>
      <div className="flex h-full flex-col bg-surface-1 text-[11px]">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="rounded-full bg-surface-3 p-1">
            <ChevronLeft className="size-4" />
          </span>
          <span className="flex gap-1 rounded-full bg-surface-3 p-0.5 text-[10px] font-semibold">
            <span className="rounded-full bg-background px-2.5 py-1">Expense</span>
            <span className="px-2.5 py-1 text-muted-foreground">Income</span>
            <span className="px-2.5 py-1 text-muted-foreground">Transfer</span>
          </span>
          <span className="w-6" />
        </div>
        <p className="mt-3 text-center font-display text-[44px] font-bold tabular">₹50</p>
        <p className="text-center text-muted-foreground">Cash · Today</p>
        <div className="mt-4 grid grid-cols-4 gap-2 px-4">
          {categories.map(([emoji, name]) => (
            <span
              key={name}
              className={`flex flex-col items-center gap-0.5 rounded-xl py-2 ${
                name === "Food" ? "bg-primary-soft text-primary ring-1 ring-primary" : "bg-surface-3"
              }`}
            >
              <span className="text-[16px]">{emoji}</span>
              <span className="text-[9.5px] font-medium">{name}</span>
            </span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-3 gap-1.5 px-4 pb-2 text-[17px] font-semibold">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"].map((key) => (
            <span key={key} className="flex h-10 items-center justify-center rounded-xl bg-surface-3 tabular">
              {key}
            </span>
          ))}
          <span className="flex h-10 items-center justify-center rounded-xl bg-surface-3">
            <Delete className="size-4" />
          </span>
        </div>
        <div className="px-4 pb-5">
          <span className="flex h-11 items-center justify-center rounded-full bg-gradient-brand-strong text-[13px] font-semibold text-white">
            Save expense
          </span>
        </div>
      </div>
    </PhoneScreen>
  );
}

export function PasteSmsMock() {
  return (
    <PhoneScreen nav={false}>
      <div className="flex h-full flex-col gap-3 bg-surface-1 px-4 py-2 text-[11px]">
        <div className="flex items-center gap-2">
          <MessageSquareText className="size-4 text-primary" />
          <span className="font-display text-[15px] font-bold">Paste a bank SMS</span>
        </div>
        <div className="rounded-2xl border border-border bg-surface-3 p-3 font-mono text-[10px] leading-[1.5] text-muted-foreground">
          Rs.340.00 debited from A/c XX4821 on 06-10-26 to VPA swiggy@okbank. UPI Ref 627819043512. Not you? Call your bank.
        </div>
        <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-success-ink">
          <Check className="size-3.5" /> Read on your phone. Nothing else was sent.
        </p>
        <MockCard className="bg-background">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Filled from SMS</p>
          <p className="mt-1 font-display text-[24px] font-bold tabular">₹340</p>
          <dl className="mt-2 grid grid-cols-2 gap-y-1.5">
            <dt className="text-muted-foreground">Category</dt>
            <dd className="font-medium">🍜 Food</dd>
            <dt className="text-muted-foreground">Account</dt>
            <dd className="font-medium">SBI</dd>
            <dt className="text-muted-foreground">Date</dt>
            <dd className="font-medium">6 Oct</dd>
            <dt className="text-muted-foreground">Note</dt>
            <dd className="font-medium">Swiggy</dd>
          </dl>
        </MockCard>
        <span className="mt-auto mb-4 flex h-11 items-center justify-center rounded-full bg-gradient-brand-strong text-[13px] font-semibold text-white">
          Save expense
        </span>
      </div>
    </PhoneScreen>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11px] font-bold text-primary">
      {name[0]}
    </span>
  );
}

export function FriendsMock() {
  return (
    <PhoneScreen nav="friends">
      <AppBar title="Friends" />
      <div className="flex flex-col gap-2.5 px-3 text-[11px]">
        <div className="grid grid-cols-2 gap-2">
          <MockCard className="p-2.5">
            <p className="text-muted-foreground">You are owed</p>
            <p className="font-display text-[17px] font-bold text-success-ink tabular">₹450</p>
          </MockCard>
          <MockCard className="p-2.5">
            <p className="text-muted-foreground">You owe</p>
            <p className="font-display text-[17px] font-bold tabular">₹1,200</p>
          </MockCard>
        </div>
        <MockCard className="flex flex-col gap-2.5">
          {demo.friends.map((friend) => (
            <div key={friend.name} className="flex items-center gap-2.5">
              <Avatar name={friend.name} />
              <div className="flex-1">
                <p className="font-semibold">{friend.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {friend.direction === "owes-you"
                    ? `Owes you ${formatINR(friend.amount)}`
                    : friend.direction === "you-owe"
                      ? `You owe ${formatINR(friend.amount)}`
                      : "All settled up"}
                </p>
              </div>
              {friend.direction === "owes-you" && (
                <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold">Remind</span>
              )}
              {friend.direction === "you-owe" && (
                <span className="rounded-full bg-gradient-brand-strong px-2.5 py-1 text-[10px] font-semibold text-white">Settle up</span>
              )}
            </div>
          ))}
        </MockCard>
        <MockCard>
          <p className="font-semibold">Groups</p>
          <div className="mt-2 flex items-center justify-between">
            <span>🏠 {demo.group}</span>
            <span className="text-muted-foreground">4 members</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span>🏖️ Goa trip</span>
            <span className="text-muted-foreground">5 members</span>
          </div>
        </MockCard>
      </div>
    </PhoneScreen>
  );
}

export function BudgetsMock() {
  return (
    <PhoneScreen nav="reports">
      <AppBar title="Budgets" right={<span className="text-[11px] text-muted-foreground">October</span>} />
      <div className="flex flex-col gap-2.5 px-3 text-[11px]">
        <MockCard>
          <p className="text-muted-foreground">Left this month</p>
          <p className="font-display text-[22px] font-bold tabular">₹4,100</p>
          <p className="text-muted-foreground">About ₹160 a day for 25 days</p>
        </MockCard>
        {demo.budgets.map((budget) => {
          const left = budget.limit - budget.spent;
          return (
            <MockCard key={budget.name}>
              <div className="mb-1.5 flex justify-between">
                <span className="font-semibold">
                  {budget.emoji} {budget.name}
                </span>
                <span className="text-muted-foreground tabular">{pct(budget.spent, budget.limit)}%</span>
              </div>
              <Meter value={budget.spent / budget.limit} />
              <p className="mt-1.5 text-muted-foreground tabular">
                {formatINR(left)} left of {formatINR(budget.limit)}
              </p>
            </MockCard>
          );
        })}
      </div>
    </PhoneScreen>
  );
}

function Ring({ value }: { value: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 72 72" className="size-[72px] -rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--surface-3)" strokeWidth="7" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
      />
    </svg>
  );
}

export function GoalsMock() {
  const { goal } = demo;
  const others = [
    { name: "Emergency fund", emoji: "🛟", saved: 30000, target: 100000, by: "March" },
    { name: "New phone", emoji: "📱", saved: 6000, target: 24000, by: "January" },
  ];
  return (
    <PhoneScreen nav="home">
      <AppBar title="Goals" right={<Plus className="size-4" />} />
      <div className="flex flex-col gap-2.5 px-3 text-[11px]">
        <MockCard className="flex items-center gap-3">
          <div className="relative">
            <Ring value={goal.saved / goal.target} />
            <span className="absolute inset-0 flex items-center justify-center text-[12px] font-bold tabular">
              {pct(goal.saved, goal.target)}%
            </span>
          </div>
          <div className="flex-1">
            <p className="font-display text-[15px] font-bold">🏖️ {goal.name}</p>
            <p className="text-muted-foreground tabular">
              {formatINR(goal.saved)} of {formatINR(goal.target)}
            </p>
            <p className="text-muted-foreground">By {goal.by}</p>
          </div>
        </MockCard>
        <span className="flex h-9 items-center justify-center rounded-full bg-gradient-brand-strong text-[12px] font-semibold text-white">
          Add money to Goa trip
        </span>
        {others.map((item) => (
          <MockCard key={item.name}>
            <div className="mb-1.5 flex justify-between">
              <span className="font-semibold">
                {item.emoji} {item.name}
              </span>
              <span className="text-muted-foreground">By {item.by}</span>
            </div>
            <Meter value={item.saved / item.target} />
            <p className="mt-1.5 text-muted-foreground tabular">
              {formatINR(item.saved)} of {formatINR(item.target)}
            </p>
          </MockCard>
        ))}
      </div>
    </PhoneScreen>
  );
}

export function SettingsMock() {
  const rows: [string, string][] = [
    ["Name", demo.user],
    ["UPI ID", demo.upiId],
    ["Theme", "System"],
    ["Password", "Change"],
  ];
  return (
    <PhoneScreen nav={false}>
      <AppBar title="Settings" />
      <div className="flex flex-col gap-2.5 px-3 text-[11px]">
        <MockCard className="flex flex-col divide-y divide-border p-0">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between px-3 py-2.5">
              <span>{label}</span>
              <span className="text-muted-foreground">{value}</span>
            </div>
          ))}
        </MockCard>
        <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Your data</p>
        <MockCard className="flex flex-col divide-y divide-border p-0">
          <div className="flex justify-between px-3 py-2.5">
            <span>Import from CSV</span>
            <span className="text-primary">Choose file</span>
          </div>
          <div className="flex justify-between px-3 py-2.5">
            <span>Export transactions</span>
            <span className="text-primary">Download CSV</span>
          </div>
        </MockCard>
        <MockCard className="border-danger/40">
          <p className="font-semibold text-danger">Delete account</p>
          <p className="mt-1 text-muted-foreground">
            You are signed out everywhere. Log in within 30 days to cancel, otherwise everything is deleted.
          </p>
        </MockCard>
      </div>
    </PhoneScreen>
  );
}
