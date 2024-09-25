const mongoose=require('mongoose')
 const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected");
        
    } catch (error) {
        console.error(error);
        
    }
}
module.exports=connectDB;