var express = require('express');
var router = express.Router();
var multer = require('multer');

/* GET home page. */
router.get('/getData', (req, res, next) => {
  res.json({
  	"state": 0,
  	"data": [
  		{
  			"name": "Jack",
  			"age": 18,
  			"phoneNumber": "11111111111"
  		},
  		{
  			"name": "李四",
  			"age": 20,
  			"phoneNumber": "99999999999"
  		},
  		{
  			"name": "张三",
  			"age": 22,
  			"phoneNumber": "1234567890"
  		},
  		{
  			"name": "Mason",
  			"age": 23,
  			"phoneNumber": "1234567891"
  		},
  		{
  			"name": "王五",
  			"age": 25,
  			"phoneNumber": "12347273748"
  		}
  	]
  });
});

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/dist/images');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now());
	}
});

var upload = multer({
	storage: storage,
	limits: {
		
	}
});

router.post('/photos/upload'/*, upload.array('photos', 12)*/, (req, res, next) => {
    console.log(req);
});


router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express', name: 'test'});
});

router.post('/test2', (req, res, next) => {
    console.log(req);
    res.send('123');
});

module.exports = router;
