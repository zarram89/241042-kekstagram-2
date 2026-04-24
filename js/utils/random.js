const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  if (lower > upper) {
    throw new RangeError('Invalid range');
  }

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

export { getRandomInteger, getRandomItem };
