/* eslint-disable no-console */
/**
 * @name CustomError
 * @description A custom error function, used to intercept errors
 * @param error The js error function to be intercepted
 * @returns {*} The error itself
 */
export default function CustomError(error) {
  console.warn(error);
  return error;
}
