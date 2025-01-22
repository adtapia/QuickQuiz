var express = require('express');
var axios = require("axios");
var router = express.Router();

let question_set = [];
let score = 0;
let token =null;

  
// Get questions from the Trivia API; Ensuring when the user resets they are served a new batch of questions 

router.get('/', async function(req, res) {

    const current_question = 0;
    score = 0; 

    // https://opentdb.com/api.php?amount=11&category=11&difficulty=medium&type=multiple
    //When the Quiz page is reached we want to create a key for the user to ensure they do not get repeated questions in a given session 
    if(token === null){
        let temp = await axios.get("https://opentdb.com/api_token.php?command=request")
        token= temp.data.token;
    }
    console.log(token);
    //fill in if Code 4: Token Empty (restart token)

    const baseURL = "https://opentdb.com/api.php";
    const amount =10;
    const category =12;
    const difficulty= "medium";
    const type = "multiple";
    const response = await axios.get(
                baseURL,
                {
                    params: {
                        amount: amount,
                        category: category,
                        difficulty: difficulty,
                        type: type
                    }
                }
            );

        //might have to but the token resest here bc this is when we call the api 
        
    question_set=response.data.results;

     console.log(question_set);
            


    res.render('quiz', { question_set, current_question, score });
});

//log 01/21 the text is not coming in how we want it to we will have to use a external library to solve this look at const he = require('he'); to do so
//we would have to seeve thoruhg the code but it has to be done also we have to shuffle the answers with the wrong answers and compare strings instead of
//letters



// router.get('/weather', async function(req, res) {
//     const appid = process.env.apikey;
//     const baseURL = "https://api.openweathermap.org/data/2.5/weather";
//     const lat = 40.73674;
//     const lon = -73.8202;
//     const units = "metric";


//     const keywords = req.query.keywords;
//     const response = await axios.get(
//         baseURL,
//         {
//             params: {
//                 lat: lat,
//                 lon: lon,
//                 units: units,
//                 appid: appid
//             }
//         }
//     );
//     console.log(response.data);
  
//     res.render("index", {
//         "title": response.data.name,
//         "data": response.data.main.temp,
//         "icon": `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
//     });
// });

// POST route to handle "Next Question"
router.post('/:index', (req, res) => {
    const current_question = parseInt(req.params.index, 10);
    const userAns = req.body.answer; 

    // Check if the user's answer is correct
    if (userAns && userAns === question_set[current_question].answer) {
        score = score + 1;
    }
    
    const next_question = current_question + 1;

    if (next_question < question_set.length) {
        res.render('quiz', { question_set, current_question: next_question, score });
    } else {

        res.redirect(`/results?score=${score}`);
    }
});


router.get('/result', (req, res) => {
  const score = req.query.score; 
  res.render('result', { score });
});

module.exports = router;
