const { asyncExec } = require('./async-exec');
const { stringifyParams } = require('./cl-params');
const { fork } = require('child_process');

const spawnThread = async (fn, ...args) => {
    const params = stringifyParams(fn, ...args);
    return asyncExec(`node ${__dirname}/worker.js ${params}`)
        .then(JSON.parse)
        .catch((error) => error);
};

const spawnThread2 =
    (...dependencies) =>
    async (fn, ...args) => {
        const child = fork(`${__dirname}/worker2.js`);
        console.info({ args });
        child.send({ dependencies, args, fn: String(fn) });

        return new Promise((resolve, reject) => {
            child.on('message', (message) => {
                resolve(message);
            });
        });
    };

module.exports = {
    spawnThread,
    spawnThread2,
};
