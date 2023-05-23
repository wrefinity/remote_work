import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()


class DBCons{
    
    // at instantiation the constructor initializes the database connections 
    constructor(){
        this.db_url = process.env.IS_PRODUCTION == true ? process.env.MONGO_PROD_URL : process.env.MONGO_LOCAL_URL
    }

    async connect(){
        await mongoose.connect(this.db_url, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }).then(
            async(res)=> { console.log("database connected")}
        ).catch(er => console.log(er))

    }
}

export default new DBCons();