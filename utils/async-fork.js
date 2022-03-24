const { fork } = require('child_process');

const asyncFork = async (workerPath, args) => {
    const child = fork(workerPath, {
        detached: true,
        silent: false,
        serialization: 'advanced',
    });
    child.send(args);
    return new Promise((resolve, reject) => {
        child.on('message', resolve);
        child.on('error', reject);
    });
};

module.exports = {
    asyncFork,
};
