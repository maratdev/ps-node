const {parentPort, workerData} = require('worker_threads');
const filledArray = require("./filledArr");
const {availableParallel} = require('os');
const compute = () => {
    filledArray(300000, availableParallel)
};

parentPort.postMessage(compute(workerData));