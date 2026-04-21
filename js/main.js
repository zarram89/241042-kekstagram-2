import { getPictures } from './data/pictures.js';
import { renderPictures } from './render/gallery.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture')?.content?.querySelector('.picture');

if (container && template) {
  renderPictures(getPictures(), container, template);
}
