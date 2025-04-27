import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for conditionally joining class names together
 * and ensuring that tailwind classes are properly merged.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
