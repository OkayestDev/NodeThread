const { parseParams } = require('../../utils/cl-params');
const { stringifyFunction } = require('../../utils/stringify-function');

describe('cl-params', () => {
    describe('parseParams', () => {
        it('works with async functions', async () => {
            const asyncFn = async (value) => ({ im: value });
            process.argv = [
                null,
                null,
                stringifyFunction(asyncFn),
                JSON.stringify({ some: 'value' }),
            ];
            const { fn, fnArgs } = parseParams();
            const result = await fn(fnArgs);
            expect(result).toStrictEqual({ im: { some: 'value' } });
        });
    });
});
