const { exec } = require('child_process');

const asyncExec = async (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                return reject(error);
            }
            return resolve(stdout);
        });
    });
};

module.exports = {
    asyncExec,
};
