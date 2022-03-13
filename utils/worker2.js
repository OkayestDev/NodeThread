process.on('message', async ({ fn, dependencies, args }) => {
    const parsedFn = eval(fn);
    const result = await parsedFn(...args);
    process.send(result);
});
