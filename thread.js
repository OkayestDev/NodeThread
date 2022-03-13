const { spawnThread } = require('./utils/spawn-thread');

const Thread = (fn, ...args) => {
    return {
        name: fn.name,
        process: spawnThread(fn, ...args),
    };
};

module.exports = {
    Thread,
};
