const { fork } = require('child_process');

const asyncFork = async (workerPath, args) => {
    const controller = new AbortController();
    const { signal } = controller;
    const child = fork(workerPath, {
        detached: true,
        silent: false,
        serialization: 'advanced',
        signal,
    });
    child.send(args);
    return new Promise((resolve, reject) => {
        child.on('message', (response) => {
            resolve(response);
            controller.abort();
        });
        child.on('error', (response) => {
            reject(response);
            controller.abort();
        });
    });
};

module.exports = {
    asyncFork,
};
