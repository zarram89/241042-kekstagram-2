const COMMENTS_PER_PORTION = 5;

const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const shownCount = document.querySelector('.social__comment-shown-count');
const totalCount = document.querySelector('.social__comment-total-count');

let comments = [];
let commentsShown = 0;
let isLoaderInitialized = false;

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

const renderComments = () => {
  const next = Math.min(commentsShown + COMMENTS_PER_PORTION, comments.length);

  const fragment = document.createDocumentFragment();

  for (let i = commentsShown; i < next; i++) {
    fragment.append(createComment(comments[i]));
  }

  commentsList.append(fragment);

  commentsShown = next;

  shownCount.textContent = String(commentsShown);
  totalCount.textContent = String(comments.length);

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const resetComments = (newComments = []) => {
  comments = newComments;
  commentsShown = 0;

  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
};

const initCommentsLoader = () => {
  if (isLoaderInitialized) {
    return;
  }
  isLoaderInitialized = true;

  commentsLoader.addEventListener('click', renderComments);
};

export {
  renderComments,
  resetComments,
  initCommentsLoader,
};
