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