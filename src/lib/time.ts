export function isClassLive(startTime: string, endTime: string): boolean {
  try {
    const now = new Date();
    // Create a new Date object representing the current time in UTC
    const nowUtc = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    ));

    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validate the dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid time value provided to isClassLive:", { startTime, endTime });
      return false;
    }

    return nowUtc.getTime() >= start.getTime() && nowUtc.getTime() <= end.getTime();
  } catch (error) {
    console.error("Error checking time:", error);
    return false;
  }
}
