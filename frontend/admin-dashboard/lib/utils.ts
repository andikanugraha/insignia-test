import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDatetime = (value: Date | string) => {
  const date = new Date(value)
  const options = { year: 'numeric', month: 'long', day: 'numeric' } satisfies Intl.DateTimeFormatOptions
  return `${date.toLocaleDateString('id-ID', options)} ${date.toLocaleTimeString('id-ID')}`
}