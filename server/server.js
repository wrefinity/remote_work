//  importing packages 
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

// define packages 
import DBcons from "./utils/database.js";
import AuthRoute from "./routes/auth.js";
import UserRoute from "./routes/user.js";

const app = express()
dotenv.config()
// connect to the database
DBcons.connect()
// middlewares 
app.use(cors(
    {
        origin: ['http://localhost:3000'],
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "UPDATE"]
    }
))
app.use("/public", express.static("./public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser(process.env.APP_SECRET))


// route caller 
app.use("/api/auth", AuthRoute);
app.use("/api/auth", UserRoute);

// handling missing paths
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errorMsg = err.message || "Path Not Found";
    return res.status(errStatus).send(errorMsg);
});

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("server connected")
})