const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const multer=require('multer')
const app=express()
const path=require('path')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const student=require('./models/userdetails-schema');
const db=require('./config/mongoose');

app.use("/images",express.static(path.join("./images")))

app.listen(3000,()=>{
    console.log("The server sarted")
});

var now=new Date()
var days=now.getDate()
var months=now.getMonth()

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
 };

 const storage = multer.diskStorage({
    destination:(req, file, cb)=> {
      const isvalid=MIME_TYPE_MAP[file.mimetype];
      let error=new Error('INvalid')
      if(isvalid){
         error=null;
      }
       cb(error,"./images");
    },
    filename: (req, file, cb) =>{
      const name=file.originalname.toLowerCase().split(' ').join('-');
      const ext =MIME_TYPE_MAP[file.mimetype];
      cb(null,name+'-'+Date.now()+'.'+ext)
    }
  });

  app.get('/birthdays',(req,res,next)=>{
    student.find({day:days,month:months}).sort({firstname:1}).exec(function(err,docs){
      if(err){
        return res.send(err)
      }
      else{
        return res.send(docs)
      }
    })
  })
  app.post('/userdetails',multer({storage:storage}).single('file'), (req,res,next)=>{
      const url=req.protocol+'://'+req.get("host")
      imagepath=url+"/images/"+req.file.filename
      console.log(req.body.dateofbirth)
    student.findOne({rollnumber:req.body.rollnumber.toLowerCase()},function(err,docs){
      if(docs){
        
         student.updateMany(
           {rollnumber:req.body.rollnumber.toLowerCase()},
          
          {
            firstname:req.body.firstname.toLowerCase(),
                lastname:req.body.lastname.toLowerCase(),
                
                image:imagepath,
                rollnumber:req.body.rollnumber.toLowerCase(),
                dateofbirth:req.body.dateofbirth,
                email:req.body.email,
                
                gender:req.body.gender.toLowerCase(),
                passedout:req.body.passedout,
                institution:req.body.institution.toLowerCase(),
                branch:req.body.branch.toLowerCase(),
                batch:req.body.batch,
                company:req.body.company.toLowerCase(),
                desgination:req.body.desgination.toLowerCase(),
                location:req.body.location.toLowerCase(),
                phonenumber:req.body.phonenumber,
                day:req.body.dateofbirth.getDate(),
                month:req.body.dateofbirth.getMonth()
          },
          {
            upsert:true
          },function(err,resolve){
            if(err){
              return res.send(err)
            }
            return res.send({status:'updated'})
          }
        )
      }
        else{
          console.log(docs)
          student.create({
            firstname:req.body.firstname.toLowerCase(),
                lastname:req.body.lastname.toLowerCase(),
                
                image:imagepath,
                rollnumber:req.body.rollnumber.toLowerCase(),
                dateofbirth:req.body.dateofbirth,
                email:req.body.email,
                
                gender:req.body.gender.toLowerCase(),
                passedout:req.body.passedout,
                institution:req.body.institution.toLowerCase(),
                branch:req.body.branch.toLowerCase(),
                batch:req.body.batch,
                company:req.body.company.toLowerCase(),
                desgination:req.body.desgination.toLowerCase(),
                location:req.body.location.toLowerCase(),
                phonenumber:req.body.phonenumber,
                day:req.body.dateofbirth.getDate(),
                month:req.body.dateofbirth.getMonth()
          },function(err,data){
            if(err){
                console.log('error in creating details',err)
                return res.send(err);
            }
            
            return res.send({status:'successful'});
          });
        }
    })
 
        
    })
    app.get('/get/alldetails',(req,res,next)=>{
      student.find({}).sort({firstname:1}).exec(function(err,docs){
        if(err){
          return res.send(err)
        }
        else{
          return res.send(docs)
        }
      })
    })
    app.get('/get/details',(req,res,next)=>{
      if(req.query.name==="firstname"){
      student.find({location:req.query.location}).sort({firstname:1}).exec(function(err,docs){
        if(err){
        return res.send(err)}
        else{
         
          return res.send(docs)
        }

      })}
      else{
        student.find({location:req.query.location}).sort({batch:-1}).exec(function(err,docs){
          if(err){
          return res.send(err)}
          else{
            console.log(docs[0].dateofbirth.getDate())
            console.log(docs[0].dateofbirth.getMonth())
            return res.send(docs)
          }
  
        })}
      
    })