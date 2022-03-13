const { Thread } = require('../thread');

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
});
