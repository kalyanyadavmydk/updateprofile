const mongoose=require('mongoose');

const userdetails=new mongoose.Schema({
  firstname:{
    type:String
  },
  lastname:{
      type:String
  },
  image:{
      type:String
  },
  rollnumber:{
      type:String
  },
  dateofbirth:{
      type:Date
  },
  gender:{
      type:String
  },
  passedout:{
      type:Number
  },
  institution:{
      type:String
  },
  branch:{
      type:String
  },
  batch:{
      type:Number
  },
  company:{
      type:String
  },
  desgination:{
      type:String
  },
  location:{
      type:String
  },
  phonenumber:{
      type:Number
  },
  email:{
      type:String
  }

});


const student=mongoose.model('user-data',userdetails);
module.exports=student;