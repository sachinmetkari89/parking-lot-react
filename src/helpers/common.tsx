import { ReactElement } from "react";
import { isEmpty, isArray, capitalize } from "lodash";
import { GetFieldErrorsProps } from "./type";

// This function checking the value is numeric or not.
const isNumeric = (num: string | number) => /^-?[0-9]+(?:\.[0-9]+)?$/.test(num + '');

// This function one object and it's have 2 key/value 1. errors and 2. errorKeys.
// This function return string with value seperated by comma.
export const getFieldErrors = ({ errors = {}, errorKeys }: GetFieldErrorsProps) => {
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
export const capitalizeLabel = (value: string | number, makeBold: boolean = false): string | number | ReactElement => {
  if (!value) return null;
  if (isNumeric(value)) {
    if (makeBold) return (<b>{value}</b>);
    return (value);
  }
  if (makeBold) return (<b>{capitalize(value)}</b>);
  return capitalize(value);
}