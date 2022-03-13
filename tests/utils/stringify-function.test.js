const { stringifyFunction } = require('../../utils/stringify-function');

describe('stringify-function', () => {
    it("returns fn as string that can be eval'ed", () => {
        const multiLineFn = (x, y) => {
            return x + y;
        };
        const fnString = stringifyFunction(multiLineFn);
        expect(fnString.includes('\n')).toBe(false);
        const fnStringEval = eval(fnString);
        const result = fnStringEval(3, 4);
        expect(result).toBe(7);
    });
});
