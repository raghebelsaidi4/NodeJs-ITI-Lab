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

// Create an instance of Exam
const myExam = new Exam(["What is JavaScript?", "Explain closures.", "What are promises?"], 5000);

// Subscribe to the 'ExamEnded' event
myExam.on('ExamEnded', () => {
    console.log("Exam allowed time finished");
});

// Start the exam
myExam.startExam();

//Why Use an Arrow Function:
    // Arrow functions do not have their own this context. Instead, they inherit this from the surrounding lexical scope,
    // which, in this case, is the instance of the Exam class. This ensures that this.emit('ExamEnded') works correctly and does not throw an error.
