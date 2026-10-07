"use client";

import { AnimatePresence, m } from "motion/react";
import { Check, Mic, SendHorizontal, Sparkles } from "lucide-react";
import { spring } from "@/lib/motion";
import { PhoneScreen } from "./parts";

const BUDGET = 8000;
const BEFORE = 5650;
const AFTER = 5700;

/**
 * The assistant logging "₹50 chai today", in three states:
 * 1 the message, 2 the confirm card, 3 confirmed with the budget updated.
 * `animate` false renders the state instantly (reduced motion, static cards).
 */
export function AssistantDemo({ step, animate = true }: { step: 1 | 2 | 3; animate?: boolean }) {
  const enter = animate ? { opacity: 0, y: 14 } : false;
  const confirmed = step === 3;

  return (
    <PhoneScreen nav={false}>
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border px-4">
        <span className="flex size-6 items-center justify-center rounded-lg bg-gradient-brand text-white">
          <Sparkles className="size-3.5" />
        </span>
        <span className="font-display text-[15px] font-bold">Assistant</span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 py-3 text-[12.5px] leading-[1.35]">
        <div className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-surface-2 px-3 py-2">
          Hi Aarav. What did you spend today?
        </div>

        <m.div
          initial={enter}
          animate={{ opacity: 1, y: 0 }}
          transition={spring.smooth}
          className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-primary px-3 py-2 font-medium text-primary-foreground"
        >
          ₹50 chai today
        </m.div>

        <AnimatePresence initial={animate}>
          {step >= 2 && (
            <m.div
              key="card"
              initial={enter}
              animate={{ opacity: 1, y: 0 }}
              transition={spring.smooth}
              className="self-start w-[92%] rounded-2xl border border-border bg-surface-1 p-3 shadow-elev-2"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Add expense</p>
              <p className="mt-1 font-display text-[22px] font-bold tabular">₹50</p>
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11.5px]">
                <div>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium">🍜 Food</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Account</dt>
                  <dd className="font-medium">Cash</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="font-medium">Today</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Note</dt>
                  <dd className="font-medium">Chai</dd>
                </div>
              </dl>
              <div className="mt-3 flex gap-2">
                <m.span
                  animate={confirmed && animate ? { scale: [1, 0.94, 1] } : undefined}
                  transition={{ duration: 0.3 }}
                  className={`flex h-8 flex-1 items-center justify-center gap-1 rounded-full text-[12px] font-semibold text-white ${
                    confirmed ? "bg-success" : "bg-gradient-brand-strong"
                  }`}
                >
                  {confirmed ? (
                    <>
                      <Check className="size-3.5" /> Saved
                    </>
                  ) : (
                    "Confirm"
                  )}
                </m.span>
                <span className="flex h-8 items-center rounded-full border border-border px-4 text-[12px] font-semibold">
                  Edit
                </span>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={animate}>
          {confirmed && (
            <m.div
              key="budget"
              initial={enter}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.smooth, delay: animate ? 0.2 : 0 }}
              className="self-start w-[92%] rounded-2xl border border-border bg-surface-1 p-3"
            >
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="font-semibold">🍜 Food budget</span>
                <span className="text-muted-foreground tabular">October</span>
              </div>
              <BudgetBar animate={animate} />
              <p className="mt-1.5 text-[11.5px] text-muted-foreground tabular">₹2,300 left of ₹8,000</p>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-border px-3 py-2.5">
        <span className="flex h-9 flex-1 items-center rounded-full bg-surface-3 px-3 text-[12px] text-muted-foreground">
          Type or say what happened
        </span>
        <m.span
          animate={step === 1 && animate ? { scale: [1, 1.18, 1] } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex size-9 items-center justify-center rounded-full ${step === 1 ? "bg-primary text-primary-foreground" : "bg-surface-3"}`}
        >
          <Mic className="size-4" />
        </m.span>
        <span className="flex size-9 items-center justify-center rounded-full bg-surface-3">
          <SendHorizontal className="size-4" />
        </span>
      </div>
    </PhoneScreen>
  );
}

function BudgetBar({ animate }: { animate: boolean }) {
  const from = BEFORE / BUDGET;
  const to = AFTER / BUDGET;
  return (
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-3">
      <m.div
        className="h-full origin-left rounded-full bg-success"
        style={{ width: "100%" }}
        initial={{ scaleX: animate ? from : to }}
        animate={{ scaleX: to }}
        transition={{ ...spring.gentle, delay: animate ? 0.45 : 0 }}
      />
    </div>
  );
}

