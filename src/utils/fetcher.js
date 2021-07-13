export default async function fetcher({ url, options }) {
  try {
    const response = await fetch(url, options)
    if (response.ok) {
      const json = await response.json()
      return json
    }
    throw response
  } catch (error) {
    throw error
  }
}