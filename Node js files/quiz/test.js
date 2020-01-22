const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myquiz', {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log('Connection established succesfully!!'))
    .catch(err => console.error('Failed to establish connection', err));


const quizSchema = mongoose.Schema({

    ques: String,
    options: [mongoose.Schema.Types.Mixed],
    ans: { type: mongoose.Schema.Types.Mixed, select: false },
    marks: { type: Number, min: 1, max: 4 },
    date: { type: Date, default: Date.now }

}, { retainKeyOrder: true });

const Quiz = mongoose.model('Quiz', quizSchema );


async function createQuestion(){

    const question = new Quiz({

        ques: 'Mongo looks for a database server listening on port 27017 on the ________ interface',
        options: [{'A': 'Web'}, {'B': 'localhost'}, {'C': 'webhost'}, {'D': 'all'}],
        ans: {'B': 'localhost'},
        marks: 1

    });

    const result = await question.save();
    console.log('Document Saved!!' + '\n', result); 

}
// createQuestion();

async function readQuestion(){

    const result = await Quiz.find();
    result.forEach((x) => {
        console.log(x);
    });

}
readQuestion();

async function updateQuestion(id){

    const result = await Quiz.findByIdAndUpdate(id, {
        $set: {
            ans: {'B': 'localhost'}
        }
    }, { new: true });
    console.log('Question Updated!!' + '\n', result);

}
// updateQuestion('5e12dddd199c3948e077ed47');

async function deleteQuestion(id){

    const result = await Quiz.findByIdAndDelete(id);
    console.log('Deleted Document!!' + '\n', result);
}
// deleteQuestion('5e12d42462d4312c9cfb4203');
