process.env.UV_THREADPOOL_SIZE = '6';
const {parentPort, workerData} = require("worker_threads");
const filledArray = require("./filledArr.js");

const chunk = (array, size) => {
    const chunks = [];
    while (array.length) {
        chunks.push(array.splice(0, size));
    }
    return chunks;
};

const SIZE_POOL = process.env.UV_THREADPOOL_SIZE;

const main = (bigNumber) => {
    performance.mark("start");
    const newArr = chunk(filledArray(bigNumber), SIZE_POOL);
    let count = 0;
    newArr.forEach(element => {
        for (let value of element) {
            if (element[value] % 3 === 0) {
                count++;
            }
        }
    });
    performance.mark("end");
    performance.measure("main", "start", "end");
    console.log(performance.getEntriesByName("main"));
};

parentPort.postMessage(main(workerData));

