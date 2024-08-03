import mongoose from 'mongoose';

export const connectDB = async(uri) =>{
    try{
        await mongoose.connect(uri)
        console.log("Connect to db")

    }catch(error){
        console.log(error)
    }
}