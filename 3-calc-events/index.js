const EventEmitter = require("events");
const myEmitter = new EventEmitter();
const {add} = require("../3-calc/add");
const {dividing} = require("../3-calc/dividing");
const {multiply} = require("../3-calc/multiply");
const {subtract} = require("../3-calc/subtract");

const [, , a, b] = process.argv;

myEmitter.once('add', (a, b) => add(a, b));
myEmitter.emit('add', a, b);

myEmitter.once('dividing', (a, b) => dividing(a, b));
myEmitter.emit('dividing', a, b);

myEmitter.once('multiply', (a, b) => multiply(a, b));
myEmitter.emit('multiply', a, b);

myEmitter.once('subtract', (a, b) => subtract(a, b));
myEmitter.emit('subtract', a, b);

myEmitter.on('error', err => console.log(err));
myEmitter.emit('off');