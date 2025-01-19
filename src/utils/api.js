class Api {
  constructor(baseURL, options) {
    this._baseUrl = baseURL;
    this._options = options;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error manual: ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(`Vix paizao, deu ruim ó: ${error}`);
      });
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Vixe amigo, erro ó: ${res.status}`);
      }
    });
  }
  setNewUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      ...this._options,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }
  setNewAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      ...this._options,
      body: JSON.stringify({
        avatar: data.link,
      }),
    });
  }
  setNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      ...this._options,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Post não enviado corretamente: ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(`Erro ao enviar novo Card: ${error}`);
      });
  }

  apiLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      ...this._options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Erro de like: ${res.status}`);
      }
    });
  }
  apiDislike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      ...this._options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Erro de dislike: ${res.status}`);
      }
    });
  }

  deleteCard(id) {
    fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      ...this._options,
    });
  }
}

const api = new Api(`https://around.nomoreparties.co/v1/web-ptbr-cohort-12`, {
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
    "Content-Type": "application/json",
  },
});

export default api;
