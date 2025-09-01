// Utility functions can be added here
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
