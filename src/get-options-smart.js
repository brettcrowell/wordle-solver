import { ALL_WORDS, ALPHABET } from "./fixtures";

export const getOptionsSmart = (
  selections = [],
  omissions = [],
  known = [],
  numChars = 5,
  acc = ALL_WORDS,
  index = 0
) => {
  let possibilities = new Set();

  if (selections[index]) {
    possibilities.add(selections[index]);
  } else {
    const curOmissions = omissions[index] ? [...omissions[index]] : [];
    console.log(curOmissions);
    ALPHABET.filter(
      (letter) => !curOmissions.includes(letter)
    ).forEach((letter) => possibilities.add(letter));
  }

  const remainingOptions = acc
    .filter((word) => possibilities.has(word[index]))
    .filter(
      (word) =>
        known.length === 0 || [...word].some((char) => known.includes(char))
    );

  if (index < numChars - 1) {
    return getOptionsSmart(
      selections,
      omissions,
      known,
      numChars,
      remainingOptions,
      index + 1
    );
  }

  return remainingOptions;
};
