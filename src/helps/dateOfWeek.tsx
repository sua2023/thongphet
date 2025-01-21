import { ScheduleDateOfWeekColumns } from "@/columns/scheduleColumn";

export const autoSliceDayOfWeek = (): string[] => {
    const today = new Date().getDay();

    const todayIndex = ScheduleDateOfWeekColumns.findIndex((_, index) => {
      return index === (today === 0 ? 1 : today);
    });

    return [
      ...ScheduleDateOfWeekColumns.slice(todayIndex),
      ...ScheduleDateOfWeekColumns.slice(0, todayIndex),
    ];
  };