
const unsplash = "816f22f2bafe647e09ea069698911cad9d74378c19ac7ac8a557ecf5ae7bb31b";

const unsplashSearch = () => {
  return "https://api.unsplash.com/search/photos?query=nike+sneakers&per_page=30&orientation=landscape&client_id="+unsplash+"";
}
const unsplashPackShot = () => {
  return "https://api.unsplash.com/search/photos?query=nike+sneakers&per_page=4&orientation=squarish&client_id="+unsplash+"";
}

const unsplashId = (id) => {
  return "https://api.unsplash.com/photos/"+id+"?page=1&client_id="+unsplash+"";
}


export default {
  unsplashSearch,
  unsplashPackShot,
  unsplashId
}