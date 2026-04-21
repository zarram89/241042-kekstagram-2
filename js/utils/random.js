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

export { getRandomInteger, getRandomItem };
