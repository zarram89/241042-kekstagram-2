const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('.img-upload__input');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');

let currentUrl;

const initUploadImage = () => {
  fileField.addEventListener('change', () => {
    const file = fileField.files[0];
    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();

    const isValid =
      FILE_TYPES.some((ext) => fileName.endsWith(ext)) &&
      file.type.startsWith('image/');

    if (!isValid) {
      return;
    }

    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
      currentUrl = null;
    }

    currentUrl = URL.createObjectURL(file);

    photoPreview.src = currentUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${currentUrl})`;
    });
  });
};

export { initUploadImage };
