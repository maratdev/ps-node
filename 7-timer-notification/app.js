const notifier = require('node-notifier');
const [, , h, m, s] = process.argv;
const hmsToMilliseconds = (h, m, s) => h * 3600000 + m * 60000 + s * 1000;
const time = hmsToMilliseconds(h, m, s);

setTimeout(() => {notifier.notify({
    title: 'My Timer',
    message: `Прошло время: ${h}:${m}:${s}`,
});}, time);
// запуск node app.js 0 0 0 -h:m:s