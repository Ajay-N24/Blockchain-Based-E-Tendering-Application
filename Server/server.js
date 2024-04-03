const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
const mongodb = require('./db');
const createuser = require("./Routes/CreateUser");
const cdtenders = require("./Routes/CDTenders");
const authMiddleware = require("./Routes/AuthMiddleware")
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-type, Accept"
    );
    next();
});
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", createuser);
app.use("/api", cdtenders);
mongodb();
app.listen(process.env.PORTNO, () => {
    console.log(`Server Working on PORT Number ${process.env.PORTNO}`);
})