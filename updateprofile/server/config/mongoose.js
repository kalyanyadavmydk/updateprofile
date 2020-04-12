const mongoose=require('mongoose');
//connecting db here name of db is student_data
mongoose.connect('mongodb://localhost/user_data');

const db=mongoose.connection;
//checking if there is error while conection
db.on('error',console.error.bind(console,'error connectig to db'));
//checking whether connection is opened
db.once('open',function(){
    console.log('db sucesfully conected');
})