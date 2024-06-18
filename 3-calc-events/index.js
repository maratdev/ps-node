const EventEmitter = require("events");
const myEmitter = new EventEmitter();
const {add} = require("../3-calc/add");
const {dividing} = require("../3-calc/dividing");
const {multiply} = require("../3-calc/multiply");
const {subtract} = require("../3-calc/subtract");

const [, , a, b, funcName] = process.argv;
const operations = {add, multiply, dividing, subtract};
if (operations.hasOwnProperty(funcName) === false) {
    console.log('Неизвестное значение');
    return;
}
Object.keys(operations).forEach(funcName => {
    myEmitter.once(funcName, operations[funcName]);
});
myEmitter.emit(funcName, a, b);