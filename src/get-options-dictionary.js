import { ALL_WORDS } from "./fixtures";

export const getOptionsDictionary = (completed, misses, confirmed) => {
  return ALL_WORDS.filter((word) => {
    for (let o of misses) {
      if (word.includes(o)) {
        return false;
      }
    }

    for (let k of confirmed) {
      if (!word.includes(k)) {
        return false;
      }
    }

    for (let s in completed) {
      if (completed[s] && word[s] !== completed[s]) {
        return false;
      }
    }

    return true;
  });
};
