import { format, parse, isValid } from 'date-fns';

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
}

export function formatTime(time: string): string {
  const parsedTime = parse(time, 'HH:mm', new Date());
  return isValid(parsedTime) ? format(parsedTime, 'h:mm a') : time;
}

export function getUpcomingDays(days: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
}