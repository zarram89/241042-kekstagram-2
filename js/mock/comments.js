import { MESSAGES, NAMES } from './const/data.js';
import { CONFIG } from './const/config.js';
import { getRandomInteger, getRandomItem } from '../utils/random.js';
import { createIdGenerator, } from '../utils/id.js';

const commentIdGenerator = createIdGenerator();

const getRandomAvatar = () =>
  `img/avatar-${getRandomInteger(CONFIG.avatar.min, CONFIG.avatar.max)}.svg`;

const createMessage = () =>
  Array.from(
    { length: getRandomInteger(CONFIG.messages.min, CONFIG.messages.max) },
    () => getRandomItem(MESSAGES)
  ).join(' ');

const createComment = () => ({
  id: commentIdGenerator(),
  avatar: getRandomAvatar(),
  message: createMessage(),
  name: getRandomItem(NAMES),
});

const getComments = () =>
  Array.from(
    { length: getRandomInteger(CONFIG.comments.min, CONFIG.comments.max) },
    createComment
  );

export { getComments };
