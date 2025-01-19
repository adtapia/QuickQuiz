var express = require('express');
var router = express.Router();
const fs = require("fs");

const path = "../../client/data/questions.json";



let question_set = [];
let current_questions = 0;
let score = 0;




function readUserDB() {
    let data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
}


try {
    let userDB = readUserDB();
    let max = userDB.length
    let q_num=0;
    let temp =null;
    while(question_set.length<11){
      temp= Math.floor(Math.random() * max) + 1;
       
      if(!question_set.includes(temp)){
        question_set[q_num] =temp
        q_num++;
      }
    }




} catch (err) {
    console.error('Error reading file:', err);
}

console.log(question_set);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('quiz');
});





module.exports = router;
