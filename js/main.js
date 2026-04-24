import { getData } from './api.js';
import { initGallery } from './ui/gallery.js';
import { initBigPicture } from './ui/big-picture/meta.js';
import { initCommentsLoader } from './ui/big-picture/comments.js';
import { initForm } from './ui/form/index.js';
import { showAlert } from './ui/messages.js';
import { initFilters } from './ui/form/filter.js';
import { debounce } from './utils/common.js';

const dom = {
  container: document.querySelector('.pictures'),
  template: document.querySelector('#picture')?.content?.querySelector('.picture'),
  filters: document.querySelector('.img-filters'),
};

initBigPicture();
initCommentsLoader();
initForm();

const initApp = async () => {
  const { container, template, filters } = dom;

  if (!container || !template) {
    return;
  }

  try {
    const pictures = await getData();

    const gallery = initGallery({ container, template });

    const debouncedRender = debounce((filtered) => {
      gallery.render(filtered);
    }, 500);

    initFilters({
      container: filters,
      pictures,
      onChange: debouncedRender,
    });

    gallery.render(pictures);

  } catch (err) {
    showAlert(err.message);
  }
};

initApp();
