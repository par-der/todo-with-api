/// <reference types="vite/client" />

declare module 'react-big-calendar' {
  import type { ComponentType } from 'react';

  export type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';
  export type DateRange = { start: Date; end: Date };

  export const Calendar: ComponentType<any>;
  export function dateFnsLocalizer(config: any): any;
}
