import { formatDistanceToNow } from "date-fns";

export function isValidUrl(url: string): boolean {
  const pattern = new RegExp('^(https?:\\/\\/)', 'i');
  return pattern.test(url);
}

export function formatDate(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}
