const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true ,  useUnifiedTopology: true })
.then(() => console.log('Connection established succesfully!!'))
.catch(err => console.error('Failed to establish connection', err));


const courseSchema = mongoose.Schema({

    tags: Array,
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number

})

const Course = mongoose.model('Course', courseSchema);

async function getAnswer() {

    const result = await Course
        .find({isPublished: true, tags: { $in: ['frontend','backend']}})
        .sort({price: -1})
        .select({name: 1, author: 1, price: 1})
        console.log (result);

}
getAnswer();
