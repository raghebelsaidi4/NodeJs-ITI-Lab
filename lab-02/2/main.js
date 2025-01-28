// main.js
const Exam = require('./Exam'); // Import the Exam class

// Create an instance of Exam with custom questions and time
const myExam = new Exam(["What is JavaScript?", "Explain closures.", "What are promises?"], 5000);

// Subscribe to the 'ExamEnded' event
myExam.on('ExamEnded', () => {
    console.log("Exam allowed time finished");
});

// Start the exam
myExam.startExam();
