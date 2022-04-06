import { isEmpty, isArray, capitalize } from "lodash";

// This function one object and it's have 2 key/value 1. errors and 2. errorKeys.
// This function return string with value seperated by comma.
export const getFieldErrors = ({ errors = {}, errorKeys }) => {
  let keys = errorKeys;
  if (isEmpty(errors) || (errors === undefined) || (keys === undefined)) return '';
  if (!isArray(keys)) keys = [keys];

  const allErrors = [];
  keys.forEach((en: string | number) => {
    if (errors[en]) {
      const errorArrToString = errors[en]?.join(', ');
      allErrors.push(errorArrToString);
    }
  });

  const uniqueErrors = allErrors.filter((v, i, a) => a.indexOf(v) === i);
  return uniqueErrors?.join(', ') || '';
};

// capitalizeLabel this function take 2 args first is value we need to makebold and
// second one is makeBold if we want to make label value display bold by default it's value is false.
export const capitalizeLabel = (labelText: string | number, makeBold: boolean = false) => {
  if (!labelText) return null;
  if (makeBold) return (<b>{capitalize(labelText)}</b>)
  return capitalize(labelText);
}