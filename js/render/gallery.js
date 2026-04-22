import { renderThumbnails } from './thumbnail.js';
import { showBigPicture } from './big-picture.js';

const renderGallery = (pictures, container, template) => {
  const picturesMap = new Map(pictures.map((item) => [item.id, item]));

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = picturesMap.get(Number(thumbnail.dataset.thumbnailId));
    showBigPicture(picture);
  });

  renderThumbnails(pictures, container, template);
};

export { renderGallery };
