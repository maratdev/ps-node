const filledArray = require("./filledArr");

const {availableParallel} = require('os');
const GenDivisor = () => {
    performance.mark('start');
    filledArray(300000, availableParallel);
    performance.mark('end');
    performance.measure('main', 'start', 'end');
    console.log(performance.getEntriesByName('main'));
}

GenDivisor();