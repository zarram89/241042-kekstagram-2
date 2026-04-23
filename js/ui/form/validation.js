import { MAX_HASHTAG_COUNT, MAX_COMMENT_LENGTH } from './const.js';
import { getTags, isValidTag, isValidCount, hasUniqueTags } from './utils.js';

const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const ERROR_MESSAGES = {
  hashtags: {
    count: () => 'превышено количество хэштегов',
    unique: () => 'хэштеги повторяются',
    format: () => 'введён невалидный хэштег',
  },
  comment: {
    length: (max) => `длина комментария больше ${max} символов`,
  },
};

const formConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const pristine = new Pristine(form, formConfig);

const initValidation = () => {
  [hashtagField, commentField].forEach((field) => {
    field.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.stopPropagation();
      }
    });
  });

  pristine.addValidator(
    hashtagField,
    (value) => isValidCount(getTags(value), MAX_HASHTAG_COUNT),
    ERROR_MESSAGES.hashtags.count()
  );

  pristine.addValidator(
    hashtagField,
    (value) => hasUniqueTags(getTags(value)),
    ERROR_MESSAGES.hashtags.unique()
  );

  pristine.addValidator(
    hashtagField,
    (value) => getTags(value).every(isValidTag),
    ERROR_MESSAGES.hashtags.format()
  );

  pristine.addValidator(
    commentField,
    (value) => value.length <= MAX_COMMENT_LENGTH,
    ERROR_MESSAGES.comment.length(MAX_COMMENT_LENGTH)
  );
};

const isValid = () => pristine.validate();

const resetValidation = () => pristine.reset();

export { initValidation, isValid, resetValidation };
