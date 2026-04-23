import { initModal } from './modal.js';
import { initValidation, resetValidation } from './validation.js';
import { initSubmit } from './submit.js';
import { initScale } from './scale.js';
import { initEffects } from './effect.js';

const initForm = () => {
  initValidation();
  initSubmit();
  initScale();
  initEffects();

  initModal(() => {
    resetValidation();
  });
};

export { initForm };
