import { isEscapeKey } from '../../utils/common.js';
import { renderComments, resetComments } from './comments.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const caption = bigPicture.querySelector('.social__caption');

let isOpen = false;
let isInitialized = false;

const renderMeta = ({ url, likes, description }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;

  likesCount.textContent = String(likes);
  caption.textContent = description;
};

const open = (data) => {
  if (!data || isOpen) {
    return;
  }

  isOpen = true;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  renderMeta(data);
  resetComments(data.comments);
  renderComments();
};

const close = () => {
  if (!isOpen) {
    return;
  }

  isOpen = false;

  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
  }
}

function onCancelButtonClick() {
  close();
}

const initBigPicture = () => {
  if (isInitialized) {
    return;
  }
  isInitialized = true;

  cancelButton.addEventListener('click', onCancelButtonClick);
};

export {
  initBigPicture,
  open as showBigPicture,
  close as hideBigPicture,
};
