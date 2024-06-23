const isDifferenceMultipleOfTwoAndNotGreaterThanOne=(a, b)=> {
    const difference = Math.abs(a - b);

    // Check if the difference is a multiple of 2
    if (difference % 2 !== 0) {
        return false;
    }

    // Check if the multiplier is not greater than 1
    const multiplier = difference / 2;
    return Math.abs(multiplier) <= 1;
}

const isConsistentDiffrence=(prevDiff, firstDiff)=>{
    // Check if the 'prevDiff' is a multiple of 'firstDiff'
    if (prevDiff % firstDiff !== 0) {
        return false;
    }

    // Check if the multiplier is not greater than 1
    const multiplier = prevDiff / firstDiff;
    return Math.abs(multiplier) <= 1;
}

// Example usage:
// console.log(isDifferenceMultipleOfTwoAndNotGreaterThanOne(4, 2)); // true
// console.log(isDifferenceMultipleOfTwoAndNotGreaterThanOne(5, 3)); // true
// console.log(isDifferenceMultipleOfTwoAndNotGreaterThanOne(8, 4)); // false
// console.log(isDifferenceMultipleOfTwoAndNotGreaterThanOne(7, 5)); // true



console.log(isConsistentDiffrence(0,3));//true
console.log(isConsistentDiffrence(4,3));//false
console.log(isConsistentDiffrence(6,3));//true
