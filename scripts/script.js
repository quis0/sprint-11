(function () {

  const placesList = document.querySelector('.places-list');
  const popup = document.querySelector('#new-card');
  const popupClose = popup.querySelector('.popup__close');
  const popupForm = document.forms.new;
  const { name, link } = popupForm.elements;

  const popupShell = new Popup(popup);
  const popupFormValidator = new FormValidator(popupShell.getForm());
  popupShell.setEventListeners(popupFormValidator.resetErrors);
  const imagePopup = document.querySelector('#image-popup');
  const imagePopupPic = imagePopup.querySelector('.popup__image');
  const imagePopupClose = imagePopup.querySelector('.popup__close');
  const images = [...placesList.querySelectorAll('.place-card__image')];
  const imagePopupShell = new Popup(imagePopup);
  imagePopupShell.setEventListeners();
  const openImage = () => imagePopupShell.open();

  const userInfoName = document.querySelector('.user-info__name');
  const userInfoAbout = document.querySelector('.user-info__job');
  const userInfoPhoto = document.querySelector('.user-info__photo');

  const api = new Api(config);

  const userInfoShell = new UserInfo(userInfoName, userInfoAbout, userInfoPhoto, api);
  userInfoShell.render();
  const userInfoButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__edit-button');

  const putFocus = (input) => {
    input.focus();
    input.selectionStart = input.value.length;
  };

  const createEditPopupShell = () => {
    const popup = document.querySelector('#edit-popup');

    const editPopupSaveButton = popup.querySelector('.popup__button');
    const editPopupCloseButton = popup.querySelector('.popup__close');
    const editForm = popup.querySelector('.popup__form');
    const [userName, about] = [...editForm.elements];
    editPopupSaveButton.classList.add('popup__button_fontsize_medium');

    const editPopupShell = new Popup(popup);


    editButton.addEventListener('click', () => {
      editPopupShell.open();
      editPopupFormValidator.setSubmitButtonState(true);
      userName.setAttribute('value', userInfoShell.getName());
      about.setAttribute('value', userInfoShell.getAbout());
      putFocus(userName);
    });

    editPopupCloseButton.addEventListener('click', () => {
      editPopupFormValidator.resetErrors();
      editForm.reset();
      editPopupShell.close();
    });

    editForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      userInfoShell.setUserInfo(userName.value, about.value);
      userInfoShell.updateUserInfo();
      editPopupShell.close();
    });

    return editPopupShell;
  };

  const editPopupShell = createEditPopupShell();
  const editPopupFormValidator = new FormValidator(editPopupShell.getForm());
  editPopupShell.setEventListeners(editPopupFormValidator.resetErrors);

  editPopupFormValidator.setEventListeners();

  function createCard(object, openImage, images, imagePopupPic) {
    const card = new Card(object, openImage, images, imagePopupPic, userInfoShell.getUserId(), api);
    return card.create();
  };

  const cardList = new CardList(placesList, createCard, api);

  (function renderInitialCards() {
    api.getInitialCards().then((res) => {
      const userId = userInfoShell.getUserId();
      res.forEach(elem => {
        let isLiked = false;

        elem.likes.forEach(item => {
          if (userId === item._id) {
            isLiked = true;
          }
        });

        initialCards.push({ name: elem.name, link: elem.link, likes: elem.likes.length, id: elem._id, ownerId: elem.owner._id, isLiked: isLiked });
        cardList.render(openImage, images, imagePopupPic, initialCards);
      });
    })
      .catch(err => console.log(err));
  })();

  userInfoButton.addEventListener('click', () => {
    popupFormValidator.setSubmitButtonState(false);
    popupShell.open();
    putFocus(name);
  });

  popupClose.addEventListener('click', () => {
    popupFormValidator.resetErrors();
    popupFormValidator.setSubmitButtonState(false);
    popupForm.reset();
    popupShell.close();
  });

  imagePopupClose.addEventListener('click', () => {
    imagePopupShell.close();
  });


  popupFormValidator.setEventListeners();
  popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const popupFormElements = {
      name: name.value,
      link: link.value,
    };


    /*
     Надо исправить:
     - Не нужно создавать карточку до того как у Вас успешно выполнится запрос на ее создание.
     Параметрами api.postCard должны быть поля попапа создания карточки, из ответа сервера можно взять все необходимые данные.
     Можно лучше:
     - Избавиться от методов getLink, getName класса Card
    */

    api.postCard(popupFormElements.name, popupFormElements.link)
      .then((res) => {
        const card = new Card(popupFormElements, openImage, images, imagePopupPic, userInfoShell.getUserId(), api)

        const cardContainer = card.create();
        cardContainer.querySelector('.place-card__delete-icon').style.display = 'block';
        cardContainer.querySelector('.place-card__like-counter').textContent = '0';
        cardList.addCard(cardContainer);

        card.setId(res._id);

        popupShell.close();

        popupForm.reset();
        popupFormValidator.resetErrors();
        popupFormValidator.setSubmitButtonState(false);
      })
      .catch(err => console.log(err));


    /*
      Надо исправить:
      - Все действия выше должны выполняться после успешного запроса на добваление карточки
    */

  });




})();

/*
 Что понравилось:
 - Возможность поставить, удалить, показать количество лайков
 - Возможность удалить карточку

 Можно лучше:
 - Хорошей практикой считается, санчала объявлять константы, потом функции, потом назначать слушатели.
 Не стоит перемешивать в кучу объявления функций, инстансов классов и переменных.
 - Есть проблемы с форматированием.
 - Вынести 'Content-Type': 'application/json' в config

 Надо исправить:
 - Не совсем правильно был реализован API. В случае если response.ok !== true, надо возращать Promise.reject(response.status).
 - Добавление карточки реализовано неверно
 */
