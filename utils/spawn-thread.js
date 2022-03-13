const { asyncExec } = require('./async-exec');
const { stringifyParams } = require('./cl-params');

const spawnThread = async (fn, ...args) => {
    const params = stringifyParams(fn, ...args);
    return asyncExec(`node ${__dirname}/worker.js ${params}`)
        .then(JSON.parse)
        .catch((error) => error);
};

module.exports = {
    spawnThread,
};
