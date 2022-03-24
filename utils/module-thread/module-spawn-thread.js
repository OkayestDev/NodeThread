const { asyncFork } = require('../async-fork');

const moduleSpawnThread = async (moduleAbsolutePath, fnName, ...args) => {
    return asyncFork(`${__dirname}/module-worker.js`, { moduleAbsolutePath, args, fnName });
};

module.exports = {
    moduleSpawnThread,
};
