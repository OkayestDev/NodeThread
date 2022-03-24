/**
 * Works with passed functions. Can not include dependencies
 */
process.on('message', async ({ fn, args }) => {
    fn = eval(fn);
    const result = await fn(...args);
    if (!result) {
        return process.send('done');
    }
    return process.send(result);
});
