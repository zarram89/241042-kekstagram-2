import { getPictures } from './mock/pictures.js';
import { renderGallery } from './ui/gallery.js';
import { initBigPicture } from './ui/big-picture/meta.js';
import { initCommentsLoader } from './ui/big-picture/comments.js';
import { initForm } from './ui/form/index.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture')?.content?.querySelector('.picture');

initBigPicture();
initCommentsLoader();
initForm();

if (container && template) {
  renderGallery(getPictures(), container, template);
}
