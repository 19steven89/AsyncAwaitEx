//purposely added undefined c variable for testing catch block below
const add = async(a, b) => a + b + c;

//e.g. function used for testing async function, tested below
const doWork = async() => {

    try {
        const result = await add(12, 13);
        return result;
    } catch (e) {
        return 10;
    }
};

//chain a then clause onto the async function call from above
doWork().then((data) => {
    console.log(data);
}).catch((e) => {
    console.log("Something went wrong");
});