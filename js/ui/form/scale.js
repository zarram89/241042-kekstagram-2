const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const getScaleValue = () =>
  Number(scaleInputElement.value.replace('%', ''));

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const changeScale = (delta) => {
  const currentValue = getScaleValue();
  let newValue = currentValue + delta;

  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }

  scaleImage(newValue);
};

const onSmallerButtonClick = () => changeScale(-SCALE_STEP);
const onBiggerButtonClick = () => changeScale(SCALE_STEP);

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

const initScale = () => {
  scaleImage(DEFAULT_SCALE);

  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

export { initScale, resetScale };
