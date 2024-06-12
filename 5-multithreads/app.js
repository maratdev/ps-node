const filledArray = require("./filledArr.js");

const arrayArrays = [];
for (let i = 0; i <= 300000; i++) {
    if(arrayArrays[i] % 3 === 0) {
        arrayArrays.push(i);
    }
}

const main = () => {
    performance.mark("start");

    filledArray(arrayArrays);

    performance.mark("end");
    performance.measure("main", "start", "end");
    console.log(performance.getEntriesByName("main"));
};

main();