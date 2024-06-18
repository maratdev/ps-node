const {add} = require("./add");
const {multiply} = require("./multiply");
const {dividing} = require("./dividing");
const {subtract} = require("./subtract");
const [, , a, b, funcName] = process.argv;
const operations = {add, multiply, dividing, subtract};
if (operations.hasOwnProperty(funcName) === false) {
    console.log('Неизвестное значение');
    return;
}
operations[funcName](a, b)
