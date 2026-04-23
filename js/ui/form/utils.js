import { VALID_SYMBOLS } from './const.js';

const getTags = (value) =>
  value
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.trim().length);

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const isValidCount = (tags, max) => tags.length <= max;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

export { getTags, isValidTag, isValidCount, hasUniqueTags };
