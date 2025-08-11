export function isClassLive(startTime: string, endTime: string): boolean {
  try {
    // The API sends times like "2024-08-01T20:00:00.000Z" but the intent is
    // to treat the time part as local time. We will ignore the date and 'Z'.
    const now = new Date();

    // Extract HH:mm:ss from the ISO string
    const startTimeStr = startTime.substring(11, 19);
    const endTimeStr = endTime.substring(11, 19);

    const [startHours, startMinutes, startSeconds] = startTimeStr.split(':').map(Number);
    const [endHours, endMinutes, endSeconds] = endTimeStr.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, startSeconds, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, endSeconds, 0);

    // Handle cases where the class spans across midnight (e.g., starts at 10 PM, ends at 1 AM)
    if (endDate < startDate) {
      // If the current time is after the start time OR before the end time (on the next day),
      // the class is live.
      // We check if now is after startDate or if we've crossed midnight and now is before endDate.
      if (now >= startDate) { // e.g. now is 11 PM, start is 10 PM
        return true;
      } else { // e.g. now is 00:30 AM, start is 10 PM yesterday
        // We need to check if we are on the next day and before the end time.
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStartDate = new Date(yesterday);
        yesterdayStartDate.setHours(startHours, startMinutes, startSeconds, 0);
        
        // This checks if we are in the timespan [10pm yesterday, 1am today]
        return now <= endDate && now.getTime() > yesterdayStartDate.getTime();
      }
    }

    // For classes within the same day
    return now >= startDate && now <= endDate;

  } catch (error) {
    console.error("Error checking time:", error);
    return false;
  }
}
