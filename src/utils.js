export function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("default", options).format(currentDate);
}
