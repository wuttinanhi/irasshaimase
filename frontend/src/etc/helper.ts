export function getQueryParam(name: string): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
