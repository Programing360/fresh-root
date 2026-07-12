
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const protectedFetch = async (apiUrl: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${apiUrl}`, {
    // headers: await authHeaders(),
  });
  return res
}