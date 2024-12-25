// Define how our myReduce will work on arrays
interface Array<T> {
  myReduce<U>( // U is the type of accumulator/result, T is array element type
    callbackFn: (
      previousValue: U, // Accumulated value so far
      currentValue: T, // Current array element
      currentIndex: number, // Current index
      array: T[], // Original array
    ) => U, // Returns accumulated value
    initialValue?: U, // Optional starting value
  ): U; // Final accumulated value
}

Array.prototype.myReduce = function (callbackFn, initialValue) {
  // Check if initialValue was provided
  const noInitialValue = initialValue === undefined;
  const len = this.length;

  // Edge case: Empty array with no initial value
  if (noInitialValue && len === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  // Set starting values:
  // - If no initialValue: use first array element as acc, start from index 1
  // - If initialValue exists: use it as acc, start from index 0
  let acc = noInitialValue ? this[0] : initialValue;
  let startingIndex = noInitialValue ? 1 : 0;

  // Loop through array
  for (let k = startingIndex; k < len; k++) {
    // Only process if index exists (handles sparse arrays)
    if (Object.hasOwn(this, k)) {
      // Update accumulator by calling reducer function
      acc = callbackFn(acc, this[k], k, this);
    }
  }

  return acc;
};
