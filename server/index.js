const express = require("express");
const app = express();

const db = require("./db/db");

app.use(express.json());

app.use(
    express.urlencoded({
        extended: "true",
    })
);

db.connectBD();

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use("/", require("./controllers/users"));

POST = process.env.POST || 5000;
app.listen(POST, () => {
    console.log(`app is listening post ${POST}`);
});
