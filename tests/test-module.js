const fs = require('fs');

const testModule = (args) => {
    fs.writeFileSync('fromTestModule', 'hello from thread');
    return `${args} from module!`;
};

const throwsAnError = () => {
    const test = null;
    test.error();
};

module.exports = {
    testModule,
    throwsAnError,
};
