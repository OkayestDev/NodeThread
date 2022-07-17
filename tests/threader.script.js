const { Thread } = require('../index');

const label = 'threader script';
console.time(label);

const promises = [];
for (let i = 0; i < 50; i++) {
    promises.push(Thread.ModuleThread(`${__dirname}/thread-me.js`, 'threadMe').process);
}
Promise.allSettled(promises).then((res) => {
    console.info({ res });
    console.timeEnd(label);
});
