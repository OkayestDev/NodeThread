const { stringifyFunction } = require('./stringify-function');

const stringifyParams = (fn, ...args) => {
    const fnString = stringifyFunction(fn);
    const argsString = JSON.stringify(args);
    return `"${fnString}" "${argsString}"`;
};

const parseParams = () => {
    const args = process.argv.slice(2);
    console.info({ args });
    const fn = eval(args[0]);
    const fnArgs = JSON.parse(args[1]);
    return {
        fn,
        fnArgs,
    };
};

module.exports = {
    parseParams,
    stringifyParams,
};
