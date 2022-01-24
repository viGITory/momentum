export default async function getApiData(path: string) {
  const result = await fetch(path);
  let data;

  if (path.endsWith('.jpg') || path.endsWith('.webp'))
    data = await result.blob();
  else data = await result.json();

  return data;
}
