/**
 * Works with passed module name. Can include dependencies
 */
process.on('message', async ({ fnName, moduleAbsolutePath, args }) => {
    const { [fnName]: fn } = require(moduleAbsolutePath);
    const result = await fn(...args);
    return process.send(result);
});
