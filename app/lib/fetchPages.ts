export async function fetchPages({ pageParam = 1 }) {
  const API_BASE_URL = "https://admin.afghangeeksedu.org";
  const res = await fetch(
    `${API_BASE_URL}/api/pages?pagination[page]=${pageParam}&pagination[pageSize]=10&populate=*`
  );
  if (!res.ok) throw new Error("Failed to fetch pages");
  return res.json();
}
