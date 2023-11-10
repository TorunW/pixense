/**
 * a function to determine if an hour has passed since last image genration by user
 * @param dateLastUpload number
 * @param hasUploaded boolean
 * @returns boolean
 */
export const isOneHourSinceLastImageElapsed = (
  dateLastUpload: number,
  hasUploaded: boolean
): boolean => {
  if (hasUploaded) return true;
  return dateLastUpload < Date.now();
};
