export const isWithinInterval = (startTime, currentTime, intervalInSeconds) => {
    const start = new Date(startTime);
    const current = new Date(currentTime);
    const diffInSeconds = (current - start) / 1000;
    return Math.abs(diffInSeconds) <= intervalInSeconds;
  };
  