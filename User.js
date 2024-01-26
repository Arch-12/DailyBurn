const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://archanajoy2003:ArCH@cluster0.te06xit.mongodb.net/HealthDb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the db")
})
.catch((err)=>console.log('Error connecting to MongoDB:',err))

var Schema=mongoose.Schema;
var userSchema=new Schema({
    fname:String,
    lname:String,
    email:String,
    username:String,
    password:String,
    phno:String,
    gender:String,
    dob:Date,
    city:String,
     
});

let userModel=mongoose.model('userdetails',userSchema);

module.exports=userModel;