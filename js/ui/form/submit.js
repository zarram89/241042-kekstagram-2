import { isValid } from './validation.js';

const form = document.querySelector('.img-upload__form');

const initSubmit = () => {
  form.addEventListener('submit', (evt) => {
    const valid = isValid();

    if (!valid) {
      evt.preventDefault();
    }
  });
};

export { initSubmit };
