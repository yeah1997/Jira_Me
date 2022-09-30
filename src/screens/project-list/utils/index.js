export const isFalsy = (value) => (value === 0 ? true : !value);

//
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isFalsy(result[key])) delete result[key];
  });

  return result;
};
