export default class UserInfo {
  constructor({ name, link, avatar }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(link);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return this.userInfo = [
      this._name.textContent,
      this._occupation.textContent,
      this._avatar.src,
    ]

  }

  setUserInfo(name, link, avatar) {
    if (name) {
      this._name.textContent = name;
    }
    if (link) {
      this._occupation.textContent = link;
    }
    if (avatar) {
      this._avatar.src = avatar;
    }
  }
}
