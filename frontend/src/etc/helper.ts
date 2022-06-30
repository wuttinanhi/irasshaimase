export function getQueryParam(name: string): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export function formatDate(date: Date) {
  date = new Date(date);

  const d = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  });

  const t = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  return `${d} ${t}`;
}
