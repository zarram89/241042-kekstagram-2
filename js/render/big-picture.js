import { isEscapeKey } from '../utils/common.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const caption = bigPicture.querySelector('.social__caption');

const commentsList = bigPicture.querySelector('.social__comments');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const shownCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCount = bigPicture.querySelector('.social__comment-total-count');

let isOpen = false;
let isInitialized = false;

const createComment = ({ avatar, name, message }) => {
  const li = document.createElement('li');
  li.className = 'social__comment';

  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.className = 'social__text';
  text.textContent = message;

  li.append(img, text);

  return li;
};

const renderComments = (comments = []) => {
  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentsList.append(fragment);

  shownCount.textContent = String(comments.length);
  totalCount.textContent = String(comments.length);
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

const renderMeta = ({ url, likes, description }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;

  likesCount.textContent = String(likes);
  caption.textContent = description;
};

const renderBigPicture = ({ comments, ...rest }) => {
  renderMeta(rest);
  renderComments(comments);
};

const open = (data) => {
  if (!data || isOpen) {
    return;
  }

  isOpen = true;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPicture(data);
};

const initBigPicture = () => {
  if (isInitialized) {
    return;
  }
  isInitialized = true;

  cancelButton.addEventListener('click', onCancelButtonClick);
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

export {
  initBigPicture,
  open as showBigPicture,
  close as hideBigPicture,
};
