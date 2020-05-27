var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var solver = require('./routes/solver');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Enable cors
app.use(cors());
var router = express.Router();

router.route('/sudoku/solve').post(function (req, res) {
    var requestBody = req.body;

    var modifiedRequestBody = requestBody.map(element => element && element < 10 ? +element : 0);


    const result = solver.execute(modifiedRequestBody);
    res.json({ message: result });
});


app.use('/api', router);
app.listen(5000);
