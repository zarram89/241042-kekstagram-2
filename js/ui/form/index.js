import { initModal } from './modal.js';
import { initValidation, resetValidation } from './validation.js';
import { initSubmit } from './submit.js';

const initForm = () => {
  initValidation();
  initSubmit();

  initModal(() => {
    resetValidation();
  });
};

export { initForm };
