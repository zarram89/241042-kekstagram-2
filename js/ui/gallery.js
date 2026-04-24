import { renderThumbnails } from './thumbnails.js';
import { showBigPicture } from './big-picture/meta.js';

const initGallery = ({ container, template }) => {
  let currentPictures = [];

  const render = (pictures) => {
    currentPictures = pictures;
    renderThumbnails(currentPictures, container, template);
  };

  const initEvents = () => {
    container.addEventListener('click', (evt) => {
      const thumbnail = evt.target.closest('[data-thumbnail-id]');
      if (!thumbnail) {
        return;
      }

      evt.preventDefault();

      const id = Number(thumbnail.dataset.thumbnailId);

      const picture = currentPictures.find((item) => item.id === id);
      if (!picture) {
        return;
      }

      showBigPicture(picture);
    });
  };

  initEvents();

  return {
    render,
  };
};

export { initGallery };
