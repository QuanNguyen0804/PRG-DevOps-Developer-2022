const express = require("express");
const router = express.Router();

const User = require("../models/users");

router.get("/", async (req, res) => {
    try {
        const user = await User.find({});
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.get("/search/", async (req, res) => {
    try {
        const { searchValue } = req.query;

        const user = await User.find({
            $or: [
                { username: { $regex: searchValue, $options: "i" } },
                { email: { $regex: searchValue, $options: "i" } },
            ],
        });
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post("/update/", async (req, res) => {
    try {
        const { username, email, birthdate } = req.body.data;
        const _id = "632f2261c2531f0db14028c0";
        const update = {
            ...(username && { username }),
            ...(email && { email }),
            ...(birthdate && { birthdate }),
        };

        if (!Object.keys(update).length) return res.json({ success: false, message: "don't have data to update" });

        const result = await User.findOneAndUpdate({ _id }, { $set: update });

        if (!result) return res.json({ success: false, message: "don't exist data" });

        res.json({ success: true, message: "update success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
