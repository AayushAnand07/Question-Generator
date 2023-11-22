const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3001
const {QuestionStore,QuestionPaperGenerator}=require('./QuestionModel')
const validateQuestionPaperCriteria = require('./middleware')
app.use(bodyParser.json());

const questionStore = new QuestionStore();
questionStore.loadQuestionsFromFile('QuestionStore.json');



const questionPaperGenerator = new QuestionPaperGenerator(questionStore);

app.post('/api/generate',validateQuestionPaperCriteria, (req, res) => {
    const { totalMarks, difficultyDistribution } = req.body;


    const generatedPaper = questionPaperGenerator.generateQuestionPaper(totalMarks, difficultyDistribution);

    res.json({ status:200, questionPaper: generatedPaper });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})