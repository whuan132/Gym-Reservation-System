export function getRandomProfilePicture() {
  const randomNum = Math.floor(Math.random() * 5) + 1;
  return `https://flowbite.com/docs/images/people/profile-picture-${randomNum}.jpg`;
}
