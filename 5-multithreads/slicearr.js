const sliceArr = (array, size) => {
    let subarray = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice((i * size), (i * size) + size);
    }
    return subarray;
};

module.exports = sliceArr;