require("dotenv").config();
const mongoose = require("mongoose");

exports.connectBD = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.bucihud.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log("connect to databade");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
