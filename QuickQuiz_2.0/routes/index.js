var express = require('express');
var axios = require("axios");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index/form', async function(req, res) {
  


  const baseURL = "https://opentdb.com/api.php";
    const type = "multiple";
    const amount=parseInt(req.query.numquest, 10);
    const category= req.query.category;
    const difficulty= req.query.difficulty;
    
     var response = await axios.get(
                baseURL,
                {
                    params: {
                        amount: amount,
                        category: category,
                        difficulty: difficulty,
                        type: type,
                    }
                }
            );

            if(response.data.response_code == 0){
              res.redirect('quiz');
              // res.redirect(`/quiz?amount=${amount}&category=${category}&difficulty=${difficulty}`);
            }
            else{

            res.render('index');
            }
      

 
});

module.exports = router;

