const { fnSpawnThread } = require('./utils/function-thread/fn-spawn-thread');
const { moduleSpawnThread } = require('./utils/module-thread/module-spawn-thread');

const FnThread = (fn, ...args) => {
    return {
        name: fn.name,
        process: fnSpawnThread(fn, ...args),
    };
};

const ModuleThread = (moduleAbsolutePath, fnName, ...args) => {
    return {
        name: fnName,
        process: moduleSpawnThread(moduleAbsolutePath, fnName, ...args),
    };
};

module.exports = {
    FnThread,
    ModuleThread,
};
