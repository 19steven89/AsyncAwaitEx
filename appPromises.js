//version without asyncawait

const users = [{
    id: 1,
    name: "Steven",
    schoolid: 101
}, {
    id: 2,
    name: "Jessica",
    schoolid: 999
}];


const grades = [{
    id: 1,
    schoolid: 101,
    grade: 80
}, {
    id: 2,
    schoolid: 999,
    grade: 75
}, {
    id: 3,
    schoolid: 101,
    grade: 90
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        //return if user.id is equal to the id params passed in
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user)
        } else {
            reject(`Unable to find user with id ${id}`);
        }
    });
};

const getGrades = (schoolid) => {
    return new Promise((resolve, reject) => {
        //filter the grades array with the grade field where its equal to the schoolId passed in
        resolve(grades.filter((grade) => grade.schoolid === schoolid));
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolid);
    }).then((grades) => {
        //average
        let average = 0;

        if (grades.length > 0) {
            //access the individual grade in the params, then return the grade property of the grade object

            //reduce will return a sum of the grades in the Object using a + b
            //which takes the first 2 grades adds them then the calculation gets put into var a
            // with var b now holding grade 3...and so on until the sum is calculated

            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }

        return `${user.name} has an average grade of ${average}`;
    });
};

//async function alternative to the above function. Async functions always return promises
//async functions are used when the order of events matters for the execution of the code
const getStatusAlt = async(userId) => {
    //await is used when a promise is being returned 
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolid);

    let average = 0;

    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has an average grade of ${average}% in the class.`;
};

getStatusAlt(2).then((name) => {
    console.log(name);
}).catch((e) => {
    console.log(e);
});


//use the then callback to output the grades for user with id 101 when found
// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });