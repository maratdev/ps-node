const { Worker } = require("worker_threads");
const sliceArr = require("./slicearr");

const threads = process.env.UV_THREADPOOL_SIZE = 6;

const mainArray = [];
const filledArray = [];
for (let i = 0; i <= 30; i++) {
    mainArray.push(i);
    for (const elem of mainArray) {
        if(mainArray[elem] % 3 === 0) {
            filledArray.push(mainArray[i]);
        }
    }
}

console.log(filledArray);

const compute = (num) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./worker.js", {
            workerData: {
                num,
            },
        });
        worker.on("message", (message) => {
            resolve(message);
        });

        worker.on("error", (message) => {
            reject(message);
        });

        worker.on("exit", () => {
            console.log("Завершение");
        });
    });
};

async function main(array) {

    const arrOfArrays = sliceArr(array, threads);
    try {
        performance.mark("start");
       arrOfArrays.map(() => Promise.all([compute(threads)]));
    } catch (error) {
        console.error(error.message);
    }

    performance.mark("end");
    performance.measure("main", "start", "end");
    console.log(performance.getEntriesByName("main"));
}


main(mainArray);