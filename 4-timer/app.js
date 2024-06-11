const [, , h, m, s] = process.argv;
const hmsToMilliseconds = (h, m, s) => h * 3600000 + m * 60000 + s * 1000;
const time = hmsToMilliseconds(h, m, s);

setTimeout(() => { console.log('Hello World')}, time);