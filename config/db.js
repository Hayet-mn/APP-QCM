const mongoose = require('mongoose');
const config = require("config");
const db = config.get('MONGOURI')

const connectDB = async ()=>{
try{
    await mongoose.connect(db, {

        useUnifiedTopology:true,
        userNewUrlParser: true,
        userCreateIndex: true,
       
    });
    console.log('mongoose connected...')
}
catch(err){
    console.error(err.message);
    //exist process with failure

    process.exist(1);
    
}
 

}

module.exports=connectDB;