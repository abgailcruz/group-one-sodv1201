import express from "express";
import bodyParser from "body-parser";

const app = express()
const port = 4000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/login', (req, res) => {
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Running on port: http://localhost:${port}/login`)
})


/*

THIS WAS THE FIRST I STARTED WORKING


//create a get point for login page
app.get('/login', function (req, res) {
	console.log('Login Page')
	res.send ('Login Page')
	});

// create a post endpoint for login page
app.post('/login', function(req, res) {
	const { body } = req;
	// extract data from request
	// create a database entry
	res.json({"code": "loginCreated"})
	});

  */