import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function toRelativeTime(ts: number): string {
  return dayjs(ts).fromNow();
}
