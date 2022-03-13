const { Thread } = require('../thread');
const fs = require('fs');

jest.setTimeout(10000000);

describe('Thread', () => {
    it('creates a child process and returns result', async () => {
        const add = (x, y) => {
            return x + y;
        };
        const thread = Thread(add, 5, 4);
        const result = await thread.process;
        expect(result).toBe(9);
    });

    it('works with async function that returns an object', async () => {
        const asyncObjectFn = async (value) => {
            return { im: value };
        };
        const thread = Thread(asyncObjectFn, { some: 'value' });
        const result = await thread.process;
        expect(result).toStrictEqual({
            im: {
                some: 'value',
            },
        });
    });

    it('works with function with external dep', async () => {
        const fnWithDep = () => {
            const fs = require('fs');
            fs.writeFileSync('test', 'written from thread');
        };
        const thread = Thread(fnWithDep);
        const result = await thread.process;
        expect(result).toBe(undefined);
    });
});
