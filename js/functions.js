function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(e);
  }
}

// isSentenceLengthCorrect
console.log('isSentenceLengthCorrect:');
function isSentenceLengthCorrect(sentence, maxLength) {
  if (typeof sentence !== 'string') {
    throw new TypeError('sentence must be a string');
  }

  if (typeof maxLength !== 'number' || maxLength < 0) {
    throw new TypeError('maxLength must be a non-negative number');
  }

  return sentence.length <= maxLength;
}


// isSentenceLengthCorrect test
test('строка короче лимита', () => {
  if (!isSentenceLengthCorrect('hello', 10)) {
    throw new Error();
  }
});

test('строка равна лимиту', () => {
  if (!isSentenceLengthCorrect('hello', 5)) {
    throw new Error();
  }
});

test('строка длиннее лимита', () => {
  if (isSentenceLengthCorrect('hello world', 5)) {
    throw new Error();
  }
});

test('ошибка при нестроке', () => {
  let error = false;
  try {
    isSentenceLengthCorrect(123, 10);
  } catch (e) {
    error = true;
  }
  if (!error) {
    throw new Error();
  }
});

test('ошибка при некорректном лимите', () => {
  let error = false;
  try {
    isSentenceLengthCorrect('hello', -1);
  } catch (e) {
    error = true;
  }
  if (!error) {
    throw new Error();
  }
});

// isSentenceLengthCorrect
console.log('\n');
console.log('isSentenceLengthCorrect:');
function isPalindrome(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }

  const normalized = input
    .toLowerCase()
    .replace(/\s+/g, '');

  const reversed = [...normalized].reverse().join('');

  return normalized === reversed;
}

test('простая строка-палиндром', () => {
  if (!isPalindrome('топот')) {
    throw new Error();
  }
});

test('палиндром с разным регистром', () => {
  if (!isPalindrome('ДовОд')) {
    throw new Error();
  }
});

test('не палиндром', () => {
  if (isPalindrome('Кекс')) {
    throw new Error();
  }
});

test('палиндром с пробелами', () => {
  if (!isPalindrome('Лёша на полке клопа нашёл')) {
    throw new Error();
  }
});

test('пустая строка', () => {
  if (!isPalindrome('')) {
    throw new Error();
  }
});

test('один символ', () => {
  if (!isPalindrome('a')) {
    throw new Error();
  }
});

// isSentenceLengthCorrect
console.log('\n');
console.log('extractDigits:');
function extractDigits(input) {
  if (typeof input !== 'string' && typeof input !== 'number') {
    throw new TypeError('input must be a string or number');
  }

  const str = input.toString();

  let result = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (!Number.isNaN(parseInt(char, 10))) {
      result += char;
    }
  }

  if (result === '') {
    return NaN;
  }

  return parseInt(result, 10);
}

// isSentenceLengthCorrect test
test('из строки с цифрами', () => {
  if (extractDigits('2023 год') !== 2023) {
    throw new Error();
  }
});

test('цифры в конце', () => {
  if (extractDigits('ECMAScript 2022') !== 2022) {
    throw new Error();
  }
});

test('смешанная строка', () => {
  if (extractDigits('1 кефир, 0.5 батона') !== 105) {
    throw new Error();
  }
});

test('ведущие нули', () => {
  if (extractDigits('агент 007') !== 7) {
    throw new Error();
  }
});

test('без цифр', () => {
  if (!Number.isNaN(extractDigits('а я томат'))) {
    throw new Error();
  }
});

test('положительное число', () => {
  if (extractDigits(2023) !== 2023) {
    throw new Error();
  }
});

test('отрицательное число', () => {
  if (extractDigits(-1) !== 1) {
    throw new Error();
  }
});

test('дробное число', () => {
  if (extractDigits(1.5) !== 15) {
    throw new Error();
  }
});

test('пустая строка', () => {
  if (!Number.isNaN(extractDigits(''))) {
    throw new Error();
  }
});

test('только символы', () => {
  if (!Number.isNaN(extractDigits('abc'))) {
    throw new Error();
  }
});
