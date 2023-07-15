let profile_pictures: { [id: string]: string } = {};

const IconHelper = {
  bootstrap: () => {
    const data = localStorage.getItem("GR-PROFILE-PICTURES");
    if (data) {
      profile_pictures = JSON.parse(data);
    }
  },

  getRandomProfilePicture: (id: string = ""): string => {
    if (id && profile_pictures[id] !== undefined) {
      return profile_pictures[id];
    }
    const random = Math.floor(Math.random() * 5) + 1;
    const picture = `https://flowbite.com/docs/images/people/profile-picture-${random}.jpg`;
    if (id) {
      profile_pictures[id] = picture;
      localStorage.setItem(
        "GR-PROFILE-PICTURES",
        JSON.stringify(profile_pictures),
      );
    }
    return picture;
  },
};

export default IconHelper;
