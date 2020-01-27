const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydemo', {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log('Connection established succesfully!!'))
    .catch(err => console.error('Failed to establish connection', err));


//Add
const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Courses', courseSchema);     //compile into model to get class

// async function addCourse(){

//     const course = new Course({
//         name: 'Reactjs',
//         author: 'Me',
//         tags: ['react', 'frontend'],
//         isPublished: true
//     });
    
//     const result = await course.save();
//     console.log(result);

// }

// addCourse();



//Query
async function getCourses(){

    const result = await Course
        .find({author: 'Me', isPublished: true})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(result);

}

getCourses();