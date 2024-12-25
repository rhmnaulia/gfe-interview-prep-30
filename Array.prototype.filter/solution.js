/**
 * Custom implementation of Array.filter() method
 * Extends the Array prototype to add myFilter method
 *
 * @param {Function} predicate - Function to test each element of the array
 * @param {*} [thisArg] - Optional object to use as 'this' when executing predicate
 * @returns {Array} A new array with elements that pass the predicate test
 */
Array.prototype.myFilter = function (predicate, thisArg) {
  // Input validation
  if (typeof predicate !== "function") {
    throw new TypeError("Predicate must be a function");
  }

  // Initialize array to store filtered elements
  const filteredArray = [];

  // Get the length once to optimize loop
  const length = this.length;

  // Iterate through each element in the array
  for (let index = 0; index < length; index++) {
    const currentValue = this[index];

    // Check if:
    // 1. The index actually exists on the array (handles sparse arrays)
    // 2. The predicate returns true for this element
    const shouldInclude =
      Object.hasOwn(this, index) &&
      predicate.call(thisArg, currentValue, index, this);

    if (shouldInclude) {
      filteredArray.push(currentValue);
    }
  }

  return filteredArray;
};
