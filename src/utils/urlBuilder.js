export default function urlBuilder(url, params) {
  if(!params) return url
  const query = new URLSearchParams(params).toString()
  return `${url}?${query}`
}