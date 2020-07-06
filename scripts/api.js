class Api {
  constructor(config) {
    this._url = config.url;
    this._authorization = config.authorization;
  }

  async getInitialCards() {
    try {
      const response = await fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorization
        }
      });
      if (response.ok) {
        return await response.json();
      } else {
        return Promise.reject(response.status);
      }
      /*
       Надо исправить:
        - Если response.ok === false, необходимо возращать Promise.reject(response.status)
      */
    } catch (err) {
      return Promise.reject(err);
      /*
       Надо исправить:
       - Сюда попадет ошибка сети, у нее нет статуса. Необходимо возращать Promise.reject(err);
       */
    }

  }

  async toggleLike(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    try {
      const response = await fetch(`${this._url}/cards/like/${cardId}`, {
        method: `${method}`,
        headers: {
          authorization: this._authorization,
        },
      });
      if (response.ok) {
        return await response.json();
      } else {
        return Promise.reject(response.status);
      }
      /*
       Надо исправить:
       - Если response.ok === false, необходимо возращать Promise.reject(response.status)
       */
    } catch (err) {
      return Promise.reject(err)
      /*
       Надо исправить:
       - Сюда попадет ошибка сети, у нее нет статуса. Необходимо возращать Promise.reject(err);
       */
    }
  }

  async deleteCard(cardId) {
    try {
      const response = await fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
        },
      });
      if (response.ok) {
        return await response.json();
      } else {
        return Promise.reject(response.status);
      }
      /*
       Надо исправить:
       - Если response.ok === false, необходимо возращать Promise.reject(response.status)
       */
    } catch (err) {
      return Promise.reject(err);
      /*
       Надо исправить:
       - Сюда попадет ошибка сети, у нее нет статуса. Необходимо возращать Promise.reject(err);
       */
    }
  }

  async postCard(cardName, cardLink) {
    try {
      const response = await fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      if (response.ok) {
        return await response.json();
      } else {
        return Promise.reject(response.status);
      }
      /*
       Надо исправить:
       - Если response.ok === false, необходимо возращать Promise.reject(response.status)
       */
    } catch (err) {
      return Promise.reject(err);
      /*
       Надо исправить:
       - Сюда попадет ошибка сети, у нее нет статуса. Необходимо возращать Promise.reject(err);
       */
    }
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization
        }
      });

      if (response.ok) {
        return await response.json();
      } else {
        return Promise.reject(response.status);
      }
      /*
       Надо исправить:
       - Если response.ok === false, необходимо возращать Promise.reject(response.status)
       */
    } catch (err) {
      return Promise.reject(err)
      /*
       Надо исправить:
       - Сюда попадет ошибка сети, у нее нет статуса. Необходимо возращать Promise.reject(err);
       */
    }
  }

  async sendUserInfo(name, about) {
    try {
      const response = fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      });
      if (response.ok) {
        return await response.json();
      } else {
        return Promise.reject(response.status);
      }
      /*
       Надо исправить:
       - Если response.ok === false, необходимо возращать Promise.reject(response.status)
       */
    } catch (err) {
      return Promise.reject(err)
      /*
       Надо исправить:
       - Сюда попадет ошибка сети, у нее нет статуса. Необходимо возращать Promise.reject(err);
       */
    }
  }

}
