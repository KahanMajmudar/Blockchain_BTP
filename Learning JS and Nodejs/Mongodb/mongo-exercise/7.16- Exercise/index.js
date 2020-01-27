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
            .find( {isPublished: true} )
            .or( [{price: { $gte: 15 }}, {name: { $regex: /.*by.*/i }}] )
        console.log (result);

}
getAnswer();
