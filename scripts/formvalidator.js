class FormValidator {
  constructor(form) {
    this._form = form;
    this._sumbitButton = form.querySelector('.popup__button');
    this._checkInputValidity = this._checkInputValidity.bind(this);
    this._handlerInputForm = this._handlerInputForm.bind(this);
  }
  _isValidate(input) {
    input.setCustomValidity('');

    if (input.validity.valueMissing) {
      input.setCustomValidity(errorMessages.empty);
      return false
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(errorMessages.wrongLength);
      return false
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(errorMessages.wrongUrl);
      return false
    }

    return input.checkValidity();
  }
  _isFieldValid(input) {
    const errorElem = input.parentNode.querySelector(`#error-${input.id}`);

    const isValid = this._isValidate(input);

    errorElem.textContent = input.validationMessage;

    return isValid;
  }
  _isFormValid(form) {
    const inputs = [...form.elements];

    let isValid = true;

    inputs.forEach((input) => {
      if (input.type !== 'submit') {
        if (!this._isFieldValid(input)) isValid = false;
      }
    });

    return isValid;
  }
  _checkInputValidity(evt) {
    evt.preventDefault();
    this._isFormValid(this._form);
  }
  setSubmitButtonState(state) {
    if (state) {
      this._sumbitButton.removeAttribute('disabled');
      this._sumbitButton.classList.add(`popup__button_valid`);
      this._sumbitButton.classList.remove(`popup__button_invalid`);
    } else {
      this._sumbitButton.setAttribute('disabled', true);
      this._sumbitButton.classList.add(`popup__button_invalid`);
      this._sumbitButton.classList.remove(`popup__button_valid`);
    }
  }
  _handlerInputForm(evt) {
    const inputs = [...evt.currentTarget.elements];

    if (evt.target.type !== 'submit') {
      this._isFieldValid(evt.target);

      if (inputs.every(this._isValidate)) {
        this.setSubmitButtonState(true);
      } else {
        this.setSubmitButtonState(false);
      }
    }
  };
  resetErrors(form = this._form) {
    /*
     Надо исправить:
     - Этот метод должен быть внутри класса formValidator
    */

    const inputs = [...form.elements];

    inputs.forEach((input) => {
      if (input.type !== 'submit') {
        input.setCustomValidity('');
        let errorElem = form.querySelector(`#error-${input.id}`);
        errorElem.textContent = '';
      }
    });
  }
  setEventListeners() {
    this._form.addEventListener('submit', this._checkInputValidity);
    this._form.addEventListener('input', this._handlerInputForm)
  }
}
