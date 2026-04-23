import { initModal, hideModal } from './modal.js';
import { initValidation, resetValidation } from './validation.js';
import { initSubmit } from './submit.js';
import { initScale } from './scale.js';
import { initEffects } from './effect.js';
import { showSuccessMessage, showErrorMessage } from '../messages.js';

const initForm = () => {
  initValidation();

  initModal(() => {
    resetValidation();
  });


  initScale();
  initEffects();
  initSubmit({
    success: () => {
      hideModal();
      showSuccessMessage();
    },
    error: () => {
      showErrorMessage();
    },
  });
};

export { initForm };
