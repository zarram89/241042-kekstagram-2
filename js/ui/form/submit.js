import { isValid } from './validation.js';
import { sendData } from '../../api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');

let onSuccess = null;
let onError = null;

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!isValid()) {
    return;
  }

  blockSubmitButton();

  try {
    await sendData(new FormData(evt.target));
    onSuccess?.();
  } catch {
    onError?.();
  } finally {
    unblockSubmitButton();
  }
};

const initSubmit = ({ success, error }) => {
  onSuccess = success;
  onError = error;

  form.addEventListener('submit', onFormSubmit);
};

export { initSubmit };
