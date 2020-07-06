class CardList {
  constructor(container, createCard, api) {
    this._container = container;
    this._createCard = createCard;
    this.api = api;
  }

  isCardExists(link, name) {

    const allCardLinks = [...this._container.querySelectorAll('.place-card__image')].map(elem => elem.style.backgroundImage.slice(5, -2));
    const allCardNames = [...this._container.querySelectorAll('.place-card__name')].map(elem => elem.textContent);

    return (allCardNames.includes(name) && allCardLinks.includes(link)) ? true : false;
  }

  addCard(card) {

    const cardLink = card.querySelector('.place-card__image').dataset.url || card.querySelector('.place-card__image').style.backgroundImage.slice(5, -2);
    const cardName = card.querySelector('.place-card__name').textContent;

    if (this.isCardExists(cardLink, cardName)) return;

    this._container.appendChild(card);
  }

  render(openImage, images, imagePopupPic, array) {
    this._array = array;
    this._array.forEach((elem) => {
      const card = this._createCard(elem, openImage, images, imagePopupPic);
      this.addCard(card);
      /*
       Можно лучше:
       - Удалить неиспользуемый параметр true
      */
    })
  }
};
