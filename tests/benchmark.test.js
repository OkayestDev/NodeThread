const { Thread } = require('../index');
const { threadMe } = require('./thread-me');

const getExecutionTime = (label) => {
    console.time(label);
    return () => console.timeEnd(label);
};

const ARRAYS_TO_CREATE = 1000000;

describe('benchmark', () => {
    beforeAll(() => {
        const executionTimeNotThreaded = getExecutionTime('No Thread');
        for (let i = 0; i < ARRAYS_TO_CREATE; i++) {
            threadMe();
        }
        executionTimeNotThreaded();
    });

    test('ModuleThread', async () => {
        const executionTimeThreaded = getExecutionTime('ModuleThread');
        const promises = [];
        for (let i = 0; i < ARRAYS_TO_CREATE; i++) {
            promises.push(Thread.ModuleThread(`${__dirname}/thread-me.js`, threadMe.name).process);
        }
        const result = await Promise.all(promises);
        executionTimeThreaded();
        expect(result.length).toBe(ARRAYS_TO_CREATE);
    });
});
