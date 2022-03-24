const executeProcessFn = async (fn, args) => {
    try {
        const result = await fn(...args);
        if (result === undefined) {
            return process.send('done');
        }
        return process.send(result);
    } catch (error) {
        return process.send(error);
    }
};

module.exports = {
    executeProcessFn,
};
