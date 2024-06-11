const {add} = require("./add");
const {multiply} = require("./multiply");
const {dividing} = require("./dividing");
const {subtract} = require("./subtract");
const [, , a, b, funcName] = process.argv;

switch (funcName) {
    case 'add':
        add(a, b);
        break;
    case 'multiply':
        multiply(a, b);
        break;
    case 'dividing':
        dividing(a, b);
        break;
    case 'subtract':
        subtract(a, b);
        break;
    default:
        console.log( 'Неизвестное значение' );
}
