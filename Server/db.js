const mongoose = require("mongoose");
const mongouri = "mongodb+srv://ajayprmk:0zwvpB17Ep34jJOk@cluster.3vcl83v.mongodb.net/userdata";
const mongodb = async () => {
    await mongoose
        .connect(mongouri)
        .then(
            async () => {
                console.log("Connected to Mongodb")
            }
        )
        .catch((err) => {
            console.log(err);
        }
        )
}
module.exports = mongodb;