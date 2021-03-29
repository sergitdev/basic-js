const CustomError = require("../extensions/custom-error");

module.exports = function transform( arr ) {
  let discprev = '--discard-prev';
  let doubleprev = '--double-prev';
  let doublenext = '--double-next';
  let discardnext = '--discard-next';
  if (Array.isArray(arr)) {
    if (arr.length) {
      return arr.reduce((accumulator, currentValue, index, array) => {
        (index === 0 && (currentValue === discprev || currentValue === doubleprev)) || (index === array.length - 1 && (currentValue === doublenext || currentValue === discardnext)) ? null :
          currentValue === discprev ?
            array[index - 2] === discardnext ? null :
              accumulator.pop() :
            currentValue === doubleprev ? array[index - 2] === discardnext ? null :
              accumulator.push(array[index - 1]) :
              currentValue === doublenext ? accumulator.push(array[index + 1]) :
                currentValue === discardnext ? null :
                  array[index - 1] === discardnext ? null :
                    accumulator.push(currentValue);
        return accumulator;
      }, [])
    } else {
      return arr;
    }
  } else {
    throw new Error('Error');
  }
};
