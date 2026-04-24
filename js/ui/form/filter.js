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

  const filterFormElement = container.querySelector('.img-filters__form');
  const filterButtonElements = filterFormElement ?
    [...filterFormElement.querySelectorAll('.img-filters__button')] :
    [];

  if (!filterFormElement || filterButtonElements.length === 0) {
    throw new Error('Filter buttons not found');
  }

  let currentFilter = Filter.DEFAULT;
  let activeButtonElement = filterFormElement.querySelector('.img-filters__button--active');

  container.classList.remove('img-filters--inactive');

  filterButtonElements.forEach((buttonElement) => {
    buttonElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      const button = evt.currentTarget;
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }

      const newFilter = button.id;
      if (newFilter === currentFilter) {
        return;
      }

      if (activeButtonElement) {
        activeButtonElement.classList.remove('img-filters__button--active');
      }

      button.classList.add('img-filters__button--active');
      activeButtonElement = button;
      currentFilter = newFilter;

      const filtered = filterPictures(pictures, currentFilter);
      onChange(filtered);
    });
  });
};

export { initFilters, filterPictures, Filter };
