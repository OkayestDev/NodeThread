/**
 * Works with passed module name. Can include dependencies
 */
process.on('message', async ({ fnName, moduleAbsolutePath, args }) => {
    const { executeProcessFn } = require('../execute-process-fn');
    const { [fnName]: fn } = require(moduleAbsolutePath);
    executeProcessFn(fn, args);
});
