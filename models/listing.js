const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength : 3
    },

    description: String,

    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
        }
    },

    price: {
        type : Number,
        required : true,
        Min : 1
    },
    location: String,
    country: String
});

const ListingModel = mongoose.model("Listing", listingSchema);

module.exports = ListingModel;