import { isEscapeKey } from '../../utils/common.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const fileField = form.querySelector('.img-upload__input');

let onCloseCallback = null;

const showModal = () => {
  hashtagField.disabled = false;
  commentField.disabled = false;
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  fileField.value = '';
  resetScale();
  resetEffects();

  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  if (onCloseCallback) {
    onCloseCallback();
  }
};

const initModal = (cb) => {
  onCloseCallback = cb;

  fileField.addEventListener('change', showModal);
  cancelButton.addEventListener('click', hideModal);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const isMessageShown = () =>
  Boolean(document.querySelector('.error, .success'));

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isMessageShown()) {
    evt.preventDefault();
    hideModal();
  }
}

export { initModal, hideModal };
