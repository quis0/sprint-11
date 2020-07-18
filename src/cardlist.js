export class CardList {
  constructor(container, createCard, api) {
    this._container = container;
    this._createCard = createCard;
    this.api = api;
  }

  addCard(card) {
    this._container.appendChild(card);
  }

  render(openImage, images, imagePopupPic, array) {
    this._array = array;

    this._array.forEach((elem) => {
      const card = this._createCard(elem, openImage, images, imagePopupPic);
      this.addCard(card);
    })
  }
};
