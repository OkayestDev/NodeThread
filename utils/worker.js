const { parseParams } = require('./cl-params');

const { fn, fnArgs } = parseParams();

const parseResponse = (response) => {
    const json = JSON.stringify(response);
    console.log(json);
};

new Promise(async (resolve) => {
    const response = await fn(...fnArgs);
    resolve(response);
}).then(parseResponse);
