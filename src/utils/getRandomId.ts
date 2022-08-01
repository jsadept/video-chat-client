



export const getRandomId = () => {
    let min = Math.ceil(10000000);
    let max = Math.floor(99999999);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};