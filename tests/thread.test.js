const { FnThread, ModuleThread } = require('../Thread');
const fs = require('fs');

const TEST_MODULE = `${__dirname}/test-module`;

jest.setTimeout(10000000);

describe('Thread', () => {
    describe('FnThread', () => {
        it('creates a child process and returns result', async () => {
            const add = (x, y) => {
                return x + y;
            };
            const fnThread = FnThread(add, 5, 4);
            const result = await fnThread.process;
            expect(result).toBe(9);
        });

        it('works with async function that returns an object', async () => {
            const asyncObjectFn = async (value) => {
                return { im: value };
            };
            const fnThread = FnThread(asyncObjectFn, { some: 'value' });
            const result = await fnThread.process;
            expect(result).toEqual({
                im: {
                    some: 'value',
                },
            });
        });

        it('works with function with inside require', async () => {
            const fnWithDep = () => {
                const fs = require('fs');
                fs.writeFileSync('test', 'written from FnThread');
                return 'hello from thread!';
            };
            const fnThread = FnThread(fnWithDep);
            const result = await fnThread.process;
            expect(fs.existsSync('test')).toBe(true);
            expect(result).toBe('hello from thread!');
            fs.unlinkSync('test');
        });

        it('works with no response', async () => {
            const noResponseFn = () => {};
            const fnThread = FnThread(noResponseFn);
            const result = await fnThread.process;
            expect(result).toBe('done');
        });
    });

    describe('ModuleThread', () => {
        it.only('threads module', async () => {
            const thread = ModuleThread(TEST_MODULE, 'testModule', 'hello');
            const result = await thread.process;
            expect(result).toBe('hello from module!');
            expect(fs.existsSync('fromTestModule')).toBe(true);
            fs.unlinkSync('fromTestModule');
        });
    });
});
