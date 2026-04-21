const createPictureElement = ({ url, description, likes, comments }, template) => {
  const element = template.cloneNode(true);

  const elementImage = element.querySelector('.picture__img');
  elementImage.src = url;
  elementImage.alt = description;

  element.querySelector('.picture__likes').textContent = String(likes);
  element.querySelector('.picture__comments').textContent = String(comments?.length ?? 0);

  return element;
};

const renderPictures = (pictures, container, template) => {
  if (!Array.isArray(pictures)) {
    throw new TypeError('Pictures must be an array');
  }

  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createPictureElement(picture, template));
  });

  container.append(fragment);
};

export { renderPictures };
