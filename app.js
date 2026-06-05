require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const connectDb = require("./db/db");
const ListingModel = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

connectDb();

app.engine("ejs",ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

// Home route 
app.get("/", (req, res) => {
    res.send("Hey I am route");
});

// Test route
app.get("/testListing", async (req, res) => {

    let sampleListing = new ListingModel({
        title: "My New Villa",
        description: "By the Beach",
        price: 1200,
        location: "Goa",
        country: "India"
    });

    await sampleListing.save();

    console.log("Sample saved");

    res.send("Successful testing");
});

app.get("/listings/:id/edit",async(req,res) => {
   let {id} = req.params;
   let listing = await ListingModel.findById(id);

   res.render("listings/edit",{listing});
})

app.put("/listings/:id",async(req,res) => {
    let {id} = req.params;
    await ListingModel.findByIdAndUpdate(
        id,
        {
          ...req.body
        }
    );
    res.redirect(`/listings/${id}`);
})

// Show all listings
app.get("/listings", async (req, res) => {
    const allListings = await ListingModel.find({});

    res.render("listings/index", { allListings });

});


// Form for creating new listing
app.get("/listings/new", (req, res) => {

    res.render("listings/new");

});

// Save new listing to DB
app.post("/listings", async (req, res) => {

    const newListing = new ListingModel(req.body);

    await newListing.save();

    console.log("New Listing Saved");

    res.redirect("/listings");
 
});


// Show individual listing details
app.get("/listings/:id", async (req, res) => {

    let { id } = req.params;

    const listing = await ListingModel.findById(id);

    res.render("listings/show", { listing });

});

app.delete("/listings/:id",async (req,res) => {
    let {id} = req.params;
    let deletedListing = await ListingModel.findByIdAndDelete(id);

    console.log(deletedListing);
    res.redirect("/listings");
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));

});

// ERROR HANDLING MIDDLEWARE
app.use((err,req,res,next)=>{
    let {statusCode = 500,message = "Something Went Wrong"} = err;
    console.log(err);
    res.status(statusCode).send(message);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 