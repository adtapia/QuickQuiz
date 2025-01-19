
const fs = require("fs");

const path = "../client/data/questions.json";

let question_set = [];
let current_questions = 0;
let score = 0;
let timer;

function readUserDB() {
    let data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
}


try {
    let userDB = readUserDB();
    console.log(userDB[2].question)
} catch (err) {
    console.error('Error reading file:', err);
}

