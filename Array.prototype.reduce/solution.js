/**
 * @template T, U - Generic types for array elements (T) and accumulator (U)
 * @param callbackFn - The reducer function
 * @param initialValue - Optional starting value for accumulator
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  // Check if initialValue was provided
  const noInitialValue = initialValue === undefined;
  const len = this.length;

  // If no initialValue and array is empty, throw error
  if (noInitialValue && len === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  // Set up initial accumulator value and starting index:
  // If no initialValue: acc = first element, start from index 1
  // If initialValue exists: acc = initialValue, start from index 0
  let acc = noInitialValue ? this[0] : initialValue;
  let startingIndex = noInitialValue ? 1 : 0;

  // Loop through array starting from startingIndex
  for (let k = startingIndex; k < len; k++) {
    // Only process if index exists (handles sparse arrays)
    if (Object.hasOwn(this, k)) {
      // Update accumulator by calling reducer function with:
      // - Current accumulator value (acc)
      // - Current array element (this[k])
      // - Current index (k)
      // - Original array (this)
      acc = callbackFn(acc, this[k], k, this);
    }
  }

  // Return final accumulated value
  return acc;
};
