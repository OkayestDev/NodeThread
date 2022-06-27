module.exports.threadMe = async () => {
    const ARRAY_SIZE = 1000000;
    const createArray = () => {
        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i++) {
            array.push(Math.random() * 1000);
        }
        return array;
    };

    const sumArrayValues = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    };

    return sumArrayValues(createArray());
};
