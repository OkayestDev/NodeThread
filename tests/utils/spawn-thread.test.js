const { spawnThread2 } = require('../../utils/spawn-thread');
const fs = require('fs');

describe('spawn-thread', () => {
    describe('spawnThread', () => {
        it('spawns child process', async () => {
            const add = (x, y) => {
                return x + y;
            };
            const result = await spawnThread2('here')(add, 5, 4);
            expect(result).toBe(9);
        });

        it.only('works with fn with dependencies', async () => {
            const fnWithDep = () => {
                fs.writeFileSync('test', 'from other thread');
                return true;
            };
            const result = await spawnThread2(fs)(fnWithDep);
            expect(result).toBe(true);
        });
    });
});
