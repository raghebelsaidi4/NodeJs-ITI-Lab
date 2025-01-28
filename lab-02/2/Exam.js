// Exam.js
const EventEmitter = require('events');

class Exam extends EventEmitter {
    constructor(questions, timeAllowed) {
        super(); // Call parent class constructor (EventEmitter)
        this.questions = questions; // List of questions
        this.timeAllowed = timeAllowed; // Time allowed for the exam (in milliseconds)
    }

    startExam() {
        console.log("Exam started!");
        console.log("Questions:");
        this.questions.forEach((question, index) => {
            console.log(`${index + 1}. ${question}`);
        });

        // Start the timer
        setTimeout(() => {
            // Use an arrow function to maintain the "this" context
            this.emit('ExamEnded');
        }, this.timeAllowed);
    }
}

// Export the Exam class
module.exports = Exam;