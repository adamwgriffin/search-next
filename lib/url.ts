export const addUrlToBrowserHistory = (url: string) => {
  const currentUrl = window.location.href
  history.replaceState({}, '', url)
  history.replaceState({}, '', currentUrl)
}
