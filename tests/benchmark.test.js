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
