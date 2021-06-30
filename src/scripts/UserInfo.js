export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = nameSelector;
    this._occupation = jobSelector;
    this._avatar = avatarSelector;
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
