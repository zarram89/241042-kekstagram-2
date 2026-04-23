import { getData } from './api.js';
import { renderGallery } from './ui/gallery.js';
import { initBigPicture } from './ui/big-picture/meta.js';
import { initCommentsLoader } from './ui/big-picture/comments.js';
import { initForm } from './ui/form/index.js';
import { showAlert } from './ui/messages.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture')?.content?.querySelector('.picture');

initBigPicture();
initCommentsLoader();
initForm();

const initGallery = async () => {
  if (!container || !template) {
    return;
  }

  try {
    const pictures = await getData();
    renderGallery(pictures, container, template);
  } catch (err) {
    showAlert(err.message);
  }
};

initGallery();
