class Card {
  constructor(obj, openImage, imagesArray, popupImage, userId, api) {
    this._name = obj.name;
    this._link = obj.link;
    this._likes = obj.likes;
    this._id = obj.id;
    this._ownerId = obj.ownerId;
    this._isLiked = obj.isLiked;
    this._openImage = openImage;
    this._imagesArray = imagesArray;
    this._popupImage = popupImage;
    this._userId = userId;
    this.api = api;
    this.open = this.open.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.remove = this.remove.bind(this);
  }

  setId(id) {
    this._id = id;
  }

  toggleLike(event) {
    /*
     Можно лучше:
     - Хорошей практикой считается следующий вид форматирования:
     this.api.toggleLike(this._id, this._isLiked)
        .then(res => {
          event.target.classList.toggle('place-card__like-icon_liked');
          this.likeCounter.textContent = res.likes.length
          this._isLiked = !this._isLiked;
         })
         .catch(err => console.log(err));
    */
    this.api.toggleLike(this._id, this._isLiked)
      .then(res => {
        event.target.classList.toggle('place-card__like-icon_liked');
        this.likeCounter.textContent = res.likes.length
        this._isLiked = !this._isLiked;
      })
      .catch(err => console.log(err));
  }

  remove(event) {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this.api.deleteCard(this._id)
      .then(() => {
        event.target.closest('.place-card').remove();
        this._removeEventListeners()
        /*
         Надо испарвить:
          - Удаляя карточку необходимо удалить ее слушатели
        */
      })
      .catch(err => console.log(err));

    }
  }

  open() {
    if (event.target.classList.contains('place-card__image')) {
      this._imageLink = event.target.dataset.url;
      this._popupImage.src = this._imageLink;
      this._openImage();
    }
  }

  _setEventListeners() {
    this._buttonDeleteIcon.addEventListener('click', this.remove);
    this._buttonLike.addEventListener('click', this.toggleLike);
    this._imageContainer.addEventListener('click', this.open);
  }

  _removeEventListeners() {
    this._buttonDeleteIcon.removeEventListener('click', this.remove);
    this._buttonLike.removeEventListener('click', this.toggleLike);
    this._imageContainer.removeEventListener('click', this.open);
  }

  create() {
    this._cardContainer = document.createElement('div');
    this._cardContainer.classList.add('place-card');

    this._imageContainer = document.createElement('div');
    this._imageContainer.classList.add('place-card__image');
    this._imageContainer.setAttribute('style', `background-image: url('${this._link}')`);
    this._imageContainer.setAttribute('data-url', `${this._link}`);
    this._imagesArray.push(this._imageContainer);
    this._buttonDeleteIcon = document.createElement('button');
    this._buttonDeleteIcon.classList.add('place-card__delete-icon');
    if (this._ownerId === this._userId) this._buttonDeleteIcon.style.display = 'block';

    const cardDescriptionContainer = document.createElement('div');
    cardDescriptionContainer.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = this._name;

    this._buttonLike = document.createElement('button');
    this._buttonLike.classList.add('place-card__like-icon');
    if (this._isLiked) this._buttonLike.classList.add('place-card__like-icon_liked');

    this.likeCounter = document.createElement('p');
    this.likeCounter.classList.add('place-card__like-counter');
    this.likeCounter.textContent = this._likes;

    const likeContainer = document.createElement('div');
    likeContainer.classList.add('place-card__like-container');

    likeContainer.appendChild(this._buttonLike);
    likeContainer.appendChild(this.likeCounter);

    this._imageContainer.appendChild(this._buttonDeleteIcon);
    cardDescriptionContainer.appendChild(cardName);
    cardDescriptionContainer.appendChild(likeContainer);

    this._cardContainer.appendChild(this._imageContainer);
    this._cardContainer.appendChild(cardDescriptionContainer);

    this._setEventListeners();
    this._buttonDeleteIcon.addEventListener('click', () => this._removeEventListeners());

    return this._cardContainer;
  }
};
