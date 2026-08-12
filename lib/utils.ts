import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The shadcn/ui class helper: merge conditional classes, then let the later
 * Tailwind utility win when two of the same property collide.
 *
 * Without the twMerge half, passing `className="px-6"` to a component whose
 * base is `px-4` produces `px-4 px-6` and the winner depends on stylesheet
 * order rather than on the caller's intent.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
