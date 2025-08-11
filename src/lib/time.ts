export function isClassLive(startTime: string, endTime: string): boolean {
  try {
    const now = new Date();

    // Extract HH:mm:ss from the ISO strings (e.g., "2024-08-01T20:00:00.000Z")
    const startTimeStr = startTime.substring(11, 19);
    const endTimeStr = endTime.substring(11, 19);

    const [startHours, startMinutes, startSeconds] = startTimeStr.split(':').map(Number);
    const [endHours, endMinutes, endSeconds] = endTimeStr.split(':').map(Number);

    // Create date objects for today using the extracted times
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, startSeconds, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, endSeconds, 0);

    // If the end time is on the next day (e.g., starts 23:00, ends 01:00),
    // increment the endDate's day by 1.
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    
    // Now, a simple check to see if the current time is within the interval.
    return now >= startDate && now <= endDate;

  } catch (error) {
    console.error("Error checking time:", error);
    return false;
  }
}
