const { fork } = require('child_process');

const moduleSpawnThread = async (moduleAbsolutePath, fnName, ...args) => {
    const child = fork(`${__dirname}/module-worker.js`, );
    child.send({ moduleAbsolutePath, args, fnName });
    return new Promise((resolve, reject) => {
        child.on('message', resolve);
        child.on('error', reject);
    });
};

module.exports = {
    moduleSpawnThread,
};
