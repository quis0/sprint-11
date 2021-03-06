const initialCards = [

];

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка'
};

const config = {
  url: process.env.NODE_ENV === 'development' ? 'http://praktikum.tk/cohort11' : 'https://praktikum.tk/cohort11',
  authorization: '95676b56-2da6-4da6-b83d-5dd17042dba0',
}

export {initialCards, errorMessages, config}
