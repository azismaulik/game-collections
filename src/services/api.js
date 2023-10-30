const apiUrl = process.env.NEXT_PUBLIC_RAWG_API_URL;
const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export const apiCall = async ({ base, resource }) => {
  const response = await fetch(`${apiUrl}/${base}?key=${apiKey}&${resource}`);
  const data = await response.json();
  return data;
};
