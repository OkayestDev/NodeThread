const { Thread } = require('../index');
const { threadMe } = require('./thread-me');

const getExecutionTime = (label) => {
    console.time(label);
    return () => console.timeEnd(label);
};

const ARRAYS_TO_CREATE = 100;

jest.setTimeout(100000000);

describe('benchmark', () => {
    beforeAll(async () => {
        const executionTimeNotThreaded = getExecutionTime('No Thread');
        for (let i = 0; i < ARRAYS_TO_CREATE; i++) {
            await threadMe();
        }
        executionTimeNotThreaded();
    });

    beforeAll(async () => {
        const executionTimeNotThreaded = getExecutionTime('Async No Thread');
        const promises = [];
        for (let i = 0; i < ARRAYS_TO_CREATE; i++) {
            promises.push(threadMe());
        }
        await Promise.all(promises);
        executionTimeNotThreaded();
    });

    test('time for 1 node process', async () => {
        const executionTimeThreaded = getExecutionTime('Single Thread Empty Process');
        const result = await Thread.ModuleThread(`${__dirname}/empty-process.js`, 'emptyProcess')
            .process;
        executionTimeThreaded();
        expect(result).toBe('howdy!');
    });

    test('ModuleThread', async () => {
        const executionTimeThreaded = getExecutionTime('ModuleThread');
        const promises = [];
        for (let i = 0; i < ARRAYS_TO_CREATE; i++) {
            promises.push(Thread.ModuleThread(`${__dirname}/thread-me.js`, 'threadMe').process);
        }
        const result = await Promise.all(promises);
        executionTimeThreaded();
        expect(result.length).toBe(ARRAYS_TO_CREATE);
    });
});
