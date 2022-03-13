const stringifyFunction = (fn) => {
    const fnString = String(fn);
    return fnString.replace(/\n/g, ' ');
};

module.exports = {
    stringifyFunction,
};
