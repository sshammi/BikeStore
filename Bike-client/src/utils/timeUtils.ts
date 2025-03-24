export const formatTimeLeft = (seconds: number): string => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;
  
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };
  