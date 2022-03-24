const { asyncFork } = require('../async-fork');
const { stringifyFunction } = require('../stringify-function');

const fnSpawnThread = async (fn, ...args) => {
    fn = stringifyFunction(fn);
    return asyncFork(`${__dirname}/fn-worker.js`, { fn, args });
};

module.exports = {
    fnSpawnThread,
};
