export default async function getImage(timeOfDay, randomNum) {
  const result = await fetch(
    `https://raw.githubusercontent.com/viGITory/momentum-images/main/${timeOfDay}/${randomNum}.jpg`
  );

  const blob = await result.blob();

  return blob;
}
