const createThumbnail = ({ id, url, description, likes, comments }, template) => {
  const thumbnail = template.cloneNode(true);

  const thumbnailImage = thumbnail.querySelector('.picture__img');
  thumbnailImage.src = url;
  thumbnailImage.alt = description;

  thumbnail.querySelector('.picture__likes').textContent = String(likes);
  thumbnail.querySelector('.picture__comments').textContent = String(comments?.length ?? 0);
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures, container, template) => {
  if (!Array.isArray(pictures)) {
    throw new TypeError('Pictures must be an array');
  }

  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture, template);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
