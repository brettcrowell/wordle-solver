export const getOptions = (
  selections,
  omissions,
  numChars,
  acc = [""],
  index = 0
) => {
  let possibilities = [];

  if (selections[index]) {
    possibilities.push(selections[index]);
  } else {
    const curOmissions = omissions[index] ? [...omissions[index]] : [];
    possibilities = ALPHABET.filter((letter) => !curOmissions.includes(letter));
  }

  const next = acc.flatMap((str) =>
    possibilities.flatMap((possible) => `${str}${possible}`)
  );

  if (index < numChars - 1) {
    return getOptions(selections, omissions, numChars, next, index + 1);
  }

  return next;
};