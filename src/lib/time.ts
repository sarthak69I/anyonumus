export function isClassLive(startTime: string, endTime: string): boolean {
  try {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Get the current time in UTC
    const nowUtc = new Date(now.toUTCString());

    return nowUtc.getTime() >= start.getTime() && nowUtc.getTime() <= end.getTime();
  } catch (error) {
    console.error("Error checking time:", error);
    return false;
  }
}
