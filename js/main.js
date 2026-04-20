const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  'Отдыхаем... #chill #relax #group #photo',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка! #wow #car #carwow #drive',
  '#fun #party #cool #young',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Норм',
];
const NAMES = ['Николай', 'Аким', 'Ким', 'Харитон', 'Тимур', 'Степан'];
const PICTURES_LENGTH = 25;

const CONFIG = {
  likes: { min: 15, max: 200 },
  comments: { min: 0, max: 30 },
  avatar: { min: 1, max: 6 },
  messages: { min: 1, max: 2 },
};

const getRandomInteger = (min, max) => {
  if (min === undefined || max === undefined) {
    throw new TypeError('Both min and max must be provided');
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('min and max must be numbers');
  }

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError('min and max must be finite numbers');
  }

  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  if (lower > upper) {
    throw new RangeError('Invalid range');
  }

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomItem = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new TypeError('items must be a non-empty array');
  }

  return items[getRandomInteger(0, items.length - 1)];
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const pictureIdGenerator = createIdGenerator();
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
    { length: PICTURES_LENGTH },
    (_, index) => createPicture(index)
  );

// eslint-disable-next-line no-console
console.log(getPictures());
