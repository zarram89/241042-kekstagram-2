const PICTURES_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const shuffle = (array) => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

const filterPictures = (pictures, filterType) => {
  switch (filterType) {
    case Filter.RANDOM:
      return shuffle(pictures).slice(0, PICTURES_COUNT);

    case Filter.DISCUSSED:
      return [...pictures].sort(
        (a, b) => b.comments.length - a.comments.length
      );

    case Filter.DEFAULT:
    default:
      return [...pictures];
  }
};

const initFilters = ({ container, pictures, onChange }) => {
  if (!(container instanceof HTMLElement)) {
    throw new Error('Filter container not found');
  }

  let currentFilter = Filter.DEFAULT;

  container.classList.remove('img-filters--inactive');

  container.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button) {
      return;
    }

    const newFilter = button.id;

    if (newFilter === currentFilter) {
      return;
    }

    const activeButton = container.querySelector('.img-filters__button--active');
    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }

    button.classList.add('img-filters__button--active');

    currentFilter = newFilter;

    const filtered = filterPictures(pictures, currentFilter);
    onChange(filtered);
  });
};

export { initFilters, filterPictures, Filter };
