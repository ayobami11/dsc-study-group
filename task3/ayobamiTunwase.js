const squaresSum = (num) => {
    const numberArray = [];
    for (let i = 1; i <= num; i++) numberArray.push(i);
    const squaresArray = numberArray.map(num => num ** 2);
    const squaresSum = squaresArray.reduce((sum, num) => sum + num);
    return squaresSum;
}
console.log(squaresSum(5))