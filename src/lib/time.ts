export function isClassLive(startTime: string, endTime: string): boolean {
  try {
    // The API sends times like "2024-08-01T20:00:00.000Z" but intends them
    // to be treated as local time (e.g., 8 PM IST). We must ignore the 'Z'.
    const now = new Date();

    const startDateTime = new Date(startTime.substring(0, startTime.length - 1));
    const endDateTime = new Date(endTime.substring(0, endTime.length - 1));
    
    const startDate = new Date();
    startDate.setHours(startDateTime.getHours(), startDateTime.getMinutes(), startDateTime.getSeconds(), startDateTime.getMilliseconds());

    const endDate = new Date();
    endDate.setHours(endDateTime.getHours(), endDateTime.getMinutes(), endDateTime.getSeconds(), endDateTime.getMilliseconds());
    
    // Handle cases where the class spans across midnight
    if (endDate < startDate) {
      // If current time is after start time, it's within the interval.
      if (now >= startDate) {
        return true;
      }
      // If current time is before end time (on the next day), it's also within the interval.
      endDate.setDate(endDate.getDate() + 1);
      if (now <= endDate) {
          // Check if it's before the original start time on the next day
          const nextDayStart = new Date(startDate);
          nextDayStart.setDate(nextDayStart.getDate() + 1);
          return now < nextDayStart;
      }
    }
    
    return now >= startDate && now <= endDate;

  } catch (error) {
    console.error("Error checking time:", error);
    return false;
  }
}
