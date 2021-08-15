export default class UserInfo {
  constructor({ name, link, avatar }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(link);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      link: this._occupation.textContent,
      avatar: this._avatar.src,
    }

  }

  setUserInfo(userData) {
    const{ name, link, avatar} = userData;
    this._name.textContent = name;
    this._occupation.textContent = link;
    this._avatar.src = avatar;
  }
}
