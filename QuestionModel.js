const fs = require('fs');

class Question {
    constructor(question, subject, topic, difficulty, marks) {
        this.question = question;
        this.subject = subject;
        this.topic = topic;
        this.difficulty = difficulty;
        this.marks = marks;
    }
}

class QuestionStore {
    constructor() {
        this.questions = [];
    }

    loadQuestionsFromFile(filePath) {
        const rawData = fs.readFileSync(filePath);
        this.questions = JSON.parse(rawData);
        
    }

    getQuestionsByDifficulty(difficulty) {
       return this.questions.filter(q => q.difficulty === difficulty);
    }

   
}


class QuestionPaperGenerator {
    constructor(questionStore) {
        this.questionStore = questionStore;
    }
  
    generateQuestionPaper(totalMarks, difficultyDistribution) {
        const questionPaper = [];
    
      
        const totalQuestions = {};
        for (const [difficulty, percentage] of Object.entries(difficultyDistribution)) {
          totalQuestions[difficulty] = Math.floor(totalMarks * (percentage / 100));
        }
    
        
        for (const [difficulty, targetTotal] of Object.entries(totalQuestions)) {
          const questions = this.questionStore.getQuestionsByDifficulty(difficulty);
          const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    
         
          let selectedQuestions = [];
          let totalSelectedMarks = 0;
          for (const question of shuffledQuestions) {
            if (totalSelectedMarks + question.marks <= targetTotal) {
              selectedQuestions.push({ ...question });
              totalSelectedMarks += question.marks;
            }
          }
    
          questionPaper.push(...selectedQuestions);
        }
    
        return questionPaper;
      }
    


 }

 

module.exports ={
    Question,
    QuestionPaperGenerator,
    QuestionStore}