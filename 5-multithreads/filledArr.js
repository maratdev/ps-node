const filledArray = (count, threads ) => {
    let divisor = [];

    if (count % 3 === 0) {
        divisor.push(3);
        count = Math.round(count / 3);
        let max = count / 2;
        for (let i = 2; i <= max; i++) {
            if (count % i === 0) {
                divisor.push(3 * i);
            }
        }
        divisor.push(3 * count);
    }
    let subarray = [];
    for (let i = 0; i < Math.ceil(divisor.length / threads); i++) {
        subarray[i] = divisor.slice((i * threads), (i * threads) + threads);
    }
    console.log(subarray)
};

module.exports = filledArray;