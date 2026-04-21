import {
  DESCRIPTIONS,
  PICTURES_COUNT,
} from '../constants/mock.js';
import {
  CONFIG
} from '../constants/config.js';
import {
  getRandomInteger,
  getRandomItem,
} from '../utils/random.js';
import { createIdGenerator } from '../utils/id.js';
import { getComments } from './comments.js';

const pictureIdGenerator = createIdGenerator();

const createPicture = () => {
  const id = pictureIdGenerator();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomItem(DESCRIPTIONS),
    likes: getRandomInteger(CONFIG.likes.min, CONFIG.likes.max),
    comments: getComments(),
  };
};

const getPictures = () =>
  Array.from(
    { length: PICTURES_COUNT },
    () => createPicture()
  );

export { getPictures };
