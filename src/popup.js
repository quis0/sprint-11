export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._isForm = true;

    if (this._popup.querySelector('.popup__form')) {
      this._form = this._popup.querySelector('.popup__form');

    } else {
      this._isForm = false;
    }


  }

  open() {
    this._popup.classList.toggle('popup_is-opened', true);
  }

  close() {
    this._popup.classList.toggle('popup_is-opened', false);
  }

  getForm() {
    if (this._isForm) {
      return this._form;
    }
  }

  setEventListeners(resetErrors) {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {

        if (this._isForm) {
          resetErrors(this._form);
          this._form.reset();
        };

        this.close();
      }
    });

  }
}

