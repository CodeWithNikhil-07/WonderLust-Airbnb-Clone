require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const connectDb = require("./db/db");

connectDb();

app.use(express.urlencoded({ extended: true }));

// Home route 
app.get("/", (req, res) => {
    res.send("Hey I am route");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});