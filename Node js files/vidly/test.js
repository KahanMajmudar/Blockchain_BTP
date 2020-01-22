const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testing', { useNewUrlParser: true,  useUnifiedTopology: true })
.then(console.log('Connection Successful!!'))
.catch(err => {console.log("Error", err)})


let testSchema = new mongoose.Schema({

    user: String,
    email: String,
    admin: Boolean

})

let User = mongoose.model('user', testSchema);

testSchema.methods.test = function(cb){

    console.log(this._id)
    console.log(this.name)
    console.log(this.email)
    console.log(this.admin)

}

async function addUser(){

    let user = new User({
        user: 'test',
        email:'none',
        admin: true
    })

    result = await user.save();
    console.log('0', result);

}

// addUser()

async function test2(){

    result1 = await User.findOne({user: 'test'})
    console.log('1', result1)
    result2 = await result1.schema.methods.test();
    console.log('2', result2);

}

test2()
