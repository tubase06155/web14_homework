
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
let app = express();
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Hello world");
});


app.post('/ask', (req, res) => {
    console.log("Question: " + req.body.question);
    fs.readFile('./questions.txt', (err, fileData) => {
        if (err) console.log(err)
        else {
            try {
                console.log("File data: " + fileData);
                let questions = [];
                if (fileData.length && JSON.parse(fileData).length) {
                    questions = JSON.parse(fileData);
                }
                const newQuestion = {
                    id: questions.length + 1,
                    question: req.body.question,
                    yes: 0,
                    no: 0
                }
                questions.push(newQuestion);
                fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
                    if (err) console.log(err)
                    else res.redirect('http://localhost:8080');
                });
            } catch (error) {
                console.log("Error: ", error);
            }

        }
    })
});

app.get('/question', (req, res) => {
    fs.readFile('./questions.txt', (err, fileData) => {
        if (err) 
        console.log(err)
        else {
            try {
                let questions = JSON.parse(fileData);
                let index = Math.floor(Math.random() * questions.length);
                let randomQuestion = questions[index];
                res.send(randomQuestion);
            } catch (error) {
                console.log('Error!!!', error);
            }
        }
    })
})

app.put('/answer', (req, res) => {
    fs.readFile('./questions.txt', (err, fileData) => {
        if (err) console.log(err)
        else {
            try {
                let questions = JSON.parse(fileData);
                res.send(questions);
            } catch (error) {
                console.log('Error!!!', error);
            }
        }
    })
});

app.post('/answer', (req, res) => {
    let question = req.body;
    fs.readFile('./questions.txt', (err, fileData) => {
        if (err) console.log(err)
        else {
            try {
                console.log("File data: " + fileData);
                let questions = [];
                if (fileData.length && JSON.parse(fileData).length) {
                    questions = JSON.parse(fileData);
                }
                
                questions[question.id-1].yes = question.yes;
                questions[question.id-1].no = question.no;
                fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
                    if (err) console.log(err)
                    else res.send(question);
                });
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    })
});
app.listen(6969, (err) => {
    if (err) console.log(err)
    else console.log("Server is listening at port 6969.")
});

