"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/content/home";
import { PhoneShell } from "./device-shell";
import { AssistantDemo } from "./mock-screens/assistant-demo";
import { Reveal } from "./reveal";

type Step = 1 | 2 | 3;

const demoLabel = (step: Step) =>
  [
    "The Finance assistant with the message “₹50 chai today”.",
    "The assistant showing a confirm card: expense, ₹50, Food, Cash, today, with Confirm and Edit buttons.",
    "The expense saved, with the Food budget showing ₹2,300 left of ₹8,000.",
  ][step - 1];

function StepNumber({ n, active = true }: { n: number; active?: boolean }) {
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-full font-display text-base font-bold transition-colors duration-300 ${
        active ? "bg-gradient-brand-strong text-white" : "bg-surface-3 text-muted-foreground"
      }`}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

/**
 * Desktop with motion: steps scroll past a sticky phone that advances with them.
 * Mobile and reduced motion: each step sits next to its own static screen.
 */
export function HowItWorks() {
  const [step, setStep] = useState<Step>(1);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setStep(Number((entry.target as HTMLElement).dataset.step) as Step);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative py-16 sm:py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 id="how-title" className="text-title">
            How an agent works
          </h2>
          <p className="mt-4 text-subtitle text-muted-foreground">Here is Finance logging a cup of chai.</p>
        </Reveal>

        {/* Scroll-driven version */}
        <div className="mt-6 hidden gap-16 lg:grid lg:grid-cols-2 motion-reduce:lg:hidden">
          <ol>
            {steps.map((item, i) => {
              const n = (i + 1) as Step;
              const active = step === n;
              return (
                <li
                  key={item.title}
                  ref={(node) => {
                    stepRefs.current[i] = node;
                  }}
                  data-step={n}
                  className="flex min-h-[70svh] items-center"
                >
                  <div className={`flex gap-5 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-40"}`}>
                    <StepNumber n={n} active={active} />
                    <div>
                      <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                      <p className="mt-3 text-subtitle text-muted-foreground measure">{item.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center justify-center">
            <div className="relative">
              <div aria-hidden="true" className="glow-brand absolute -inset-16" />
              <PhoneShell label={demoLabel(step)} className="relative">
                <AssistantDemo step={step} />
              </PhoneShell>
            </div>
          </div>
        </div>

        {/* Static version */}
        <ol className="mt-10 grid gap-14 lg:hidden motion-reduce:lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((item, i) => {
            const n = (i + 1) as Step;
            return (
              <li key={item.title} className="flex flex-col items-center gap-6 sm:flex-row sm:items-start lg:flex-col lg:items-center">
                <div className="flex w-full gap-4 sm:max-w-xs lg:max-w-none">
                  <StepNumber n={n} />
                  <div>
                    <h3 className="font-display text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.body}</p>
                  </div>
                </div>
                <PhoneShell compact label={demoLabel(n)}>
                  <AssistantDemo step={n} animate={false} />
                </PhoneShell>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
