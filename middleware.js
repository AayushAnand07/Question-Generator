
const fs = require('fs');
function validateQuestionPaperCriteria(req, res, next) {

    const { totalMarks, difficultyDistribution } = req.body;


    // In case of invalid request
    if (!totalMarks || !difficultyDistribution) {
        return res.status(400).json({ status:400, error: 'Invalid request format.' });
    }

    
    // Validate total marks
    if (!totalMarks || isNaN(totalMarks) || totalMarks < 0) {
      return res.status(400).json({ status:400,  error: "Invalid total marks"});
    }
  
    // Validate total difficulty percentage
    const totalPercentage = Object.values(difficultyDistribution).reduce((a,b) => a + b);  
    if(totalPercentage !== 100)  {
      return res.status(400).json({
        status:400,  
        error: "Difficulty distribution must add up to 100%"});
    }
  

    // Validate each difficulty  marks availability in question store according to request
    const rawData = fs.readFileSync('QuestionStore.json');
    questions = JSON.parse(rawData);
                const questionsByDifficulty = questions.reduce((acc, question) => {
            acc[question.difficulty] = (acc[question.difficulty] || 0) + question.marks;
            return acc;
        }, {});

        for (const question of questions) {
            if (difficultyDistribution[question.difficulty] > questionsByDifficulty[question.difficulty]) {
                return res.status(400).json({
                    status: 400,
                    error: `Total marks asked for ${question.difficulty} exceeds available questions`
                });
            }
        }


    // validate total marks availability in question store according to total marks request     
        let  totalAvailableMarks=0;
        questions.forEach((element)=>{
            totalAvailableMarks+=element.marks
           
        })
        if(totalAvailableMarks<totalMarks) {
        return res.status(400).json({
            status: 400,
            error: `Total marks asked ${totalMarks} exceeds available QuestionStore Marks ${totalAvailableMarks}`
        });
    }
   
      
        
    next(); 
  }
  module.exports = validateQuestionPaperCriteria;  