/**
 * Works with passed functions. Can not include dependencies
 */
process.on('message', async ({ fn, args }) => {
    const { executeProcessFn } = require('../execute-process-fn');
    fn = eval(fn);
    executeProcessFn(fn, args);
});
