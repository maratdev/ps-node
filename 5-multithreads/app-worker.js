const { Worker } = require('worker_threads');

const compute = () => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js');

        worker.on('message', (msg) => {
            console.log(worker.threadId);
            resolve(msg);
        });

        worker.on('error', (err) => {
            reject(err);
        });

        worker.on('exit', () => {
            console.log('Завершил работу')
        });
    });
};

const main = async () => {
    try {
        performance.mark('start');
        await compute();
        performance.mark('stop');
        performance.measure('main', 'start', 'stop');
        console.log(performance.getEntriesByName('main'));
    } catch (e) {
        console.error(e.message)
    }
};

main();