const filledArray = (array) => {
    for (let i = 0; i <= array?.length; i++) {
        if (array[i] % 3 === 0) {
            array.push(i);
        }
    }
    return array;
};

module.exports = filledArray;