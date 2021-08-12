export default class UserInfo {
  constructor({ name, link, avatar }) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(link);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return (this.userInfo = [
      this._name.textContent,
      this._occupation.textContent,
      this._avatar.src,
    ]);
  }

  setUserInfo(name, link, avatar) {
    this._name.textContent = name;
    this._occupation.textContent = link;
    this._avatar.src = avatar;
  }
}
