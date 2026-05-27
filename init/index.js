const mongoose = require("mongoose");
const initData = require("./data.js");
const ListingModel = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL;

main()
  .then(() =>{
    console.log("Connected to DB");
  })
  .catch((err) =>{
    console.log(err);
  })

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
    await ListingModel.deleteMany({});
    await ListingModel.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();