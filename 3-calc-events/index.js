const EventEmitter = require("events");
const myEmitter = new EventEmitter();
const {add} = require("../add");
const {dividing} = require("../dividing");
const {multiply} = require("../multiply");
const {subtract} = require("../subtract");

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