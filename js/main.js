import { getPictures } from './data/pictures.js';
import { renderGallery } from './render/gallery.js';
import { initBigPicture } from './render/big-picture.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture')?.content?.querySelector('.picture');

initBigPicture();

if (container && template) {
  renderGallery(getPictures(), container, template);
}
