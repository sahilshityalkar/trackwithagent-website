import type { ReactNode } from "react";
import { DeviceFrame } from "./device-frame";

export type Screen = { screenshot?: string; alt: string; mock: ReactNode };

const PHONE_W = 320;
const PHONE_H = 669;

/** A phone frame drawn at a fraction of its size. Pass `relative` or `absolute` in className. */
export function ScaledPhone({ screen, scale = 1, className = "" }: { screen: Screen; scale?: number; className?: string }) {
  return (
    <div className={className} style={{ width: PHONE_W * scale, height: PHONE_H * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
        <DeviceFrame variant="phone" {...screen} />
      </div>
    </div>
  );
}

/** Two phones, the second offset behind the first. On phones only the first shows. */
export function PhonePair({ front, back }: { front: Screen; back: Screen }) {
  return (
    <div className="relative mx-auto flex w-fit items-start">
      <ScaledPhone screen={front} scale={0.92} className="relative z-10" />
      <ScaledPhone screen={back} scale={0.8} className="relative -ml-16 mt-16 hidden sm:block" />
    </div>
  );
}

/** A browser window with up to two phones overlapping its lower corners on wide screens. */
export function BrowserWithPhones({ browser, phones = [] }: { browser: Screen; phones?: Screen[] }) {
  return (
    <div className="relative pb-0 lg:pb-24">
      <DeviceFrame variant="browser" {...browser} />
      {phones[0] && (
        <ScaledPhone screen={phones[0]} scale={0.5} className="absolute -bottom-2 -right-4 hidden lg:block" />
      )}
      {phones[1] && (
        <ScaledPhone screen={phones[1]} scale={0.5} className="absolute -bottom-2 right-36 hidden xl:block" />
      )}
    </div>
  );
}
