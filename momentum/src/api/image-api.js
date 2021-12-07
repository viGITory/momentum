export default async function getImage(timeOfDay, randomNum) {
  const result = await fetch(
    `https://raw.githubusercontent.com/viGITory/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`
  );

  const blob = await result.blob();

  return blob;
}
