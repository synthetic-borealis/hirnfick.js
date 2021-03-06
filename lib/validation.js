/**
 * Validates a Brainfuck program by looking for umatched loop starts/ends.
 *
 * @param {string} source Brainfuck source-code to validate.
 * @returns {boolean} True if the program is valid, false if it's not.
 */
function isValidProgram(source) {
  const sourceArray = Array.from(source);
  const numOfLoopStarts = sourceArray.reduce((previousVal, currentVal) => (currentVal === '[' ? previousVal + 1 : previousVal), 0);
  const numOfLoopEnds = sourceArray.reduce((previousVal, currentVal) => (currentVal === ']' ? previousVal + 1 : previousVal), 0);

  return numOfLoopStarts === numOfLoopEnds;
}

module.exports = { isValidProgram };
