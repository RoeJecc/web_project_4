export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._baseURL + "/cards", {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  //GET specified URL -user-info
  getUserInfo() {
    return fetch(this._baseURL + "/users/me", {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  getAppInfo() {
    //gather all info together and render all at once
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //POST speicifed url -cards
  addCard({ name, link }) {
    return fetch(this._baseURL + "/cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  // //DELETE specified url =cardID
  removeCard(cardID) {
    return (
      fetch(this._baseURL + "/cards/" + cardID, {
        headers: this._headers,
        method: "DELETE",
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject("Error" + res.statusText)
        )
        // .then(res => res.remove())
        .catch((err) => console.log(err))
    );
  }

  //PUT specified url cardID
  //DELETE specified url cardID
  addLike(cardID) {
    return (
      fetch(this._baseURL + "/cards/likes/" + cardID, {
        headers: this._headers,
        method: "PUT",
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject("Error" + res.statusText)
        )
        //.then(res => res.remove(cardID))
        .catch((err) => console.log(err))
    );
  }

  removeLike(cardID) {
    return (
      fetch(this._baseURL + "/cards/likes/" + cardID, {
        headers: this._headers,
        method: "DELETE",
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject("Error" + res.statusText)
        )
        //.then(res => res.remove(cardID))
        .catch((err) => console.log(err))
    );
  }

  //PATCH user-info
  setUserInfo({ name, about }) {
    return fetch(this._baseURL + "/users/me/", {
      method: "PATCH",
      headers: {
        authorization: "f3cf689f-e903-4b5b-9d77-2b0b4048d455",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error" + res.statusText)
      )
      .catch((err) => console.log(err));
  }

  //PATCH avatar
  setUserAvatar(avatar) {
    return fetch(this._baseURL + "/users/me/avatar/", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Error" + res.statusText)
      )
      .catch((err) => console.log(err));
  }
}
