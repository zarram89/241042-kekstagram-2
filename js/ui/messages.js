import { isEscapeKey } from '../utils/common.js';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const dataErrorTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const showAlert = (message) => {
  const alertElement = dataErrorTemplate.cloneNode(true);

  if (message) {
    alertElement.querySelector('.data-error__title').textContent = message;
  }

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (template, buttonSelector) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector(buttonSelector);

  const removeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onOutsideClick(evt) {
    const inner = messageElement.querySelector(
      '.success__inner, .error__inner'
    );

    if (!inner.contains(evt.target)) {
      removeMessage();
    }
  }

  closeButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplate, '.error__button');
};

export { showAlert, showSuccessMessage, showErrorMessage };
